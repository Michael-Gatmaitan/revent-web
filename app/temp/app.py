from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model, Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
import joblib
import os

app = Flask(__name__)

# Path to store model and scaler
MODEL_PATH = 'lstm_model.h5'
SCALER_PATH = 'scaler.pkl'

def create_and_train_model(data, lookback=30, forecast_horizon=7, epochs=50):
    """
    Train an LSTM model on time series data
    
    Args:
        data: pandas Series or numpy array of time series data
        lookback: number of previous time steps to use as input features
        forecast_horizon: number of future time steps to predict
        epochs: number of training epochs
    
    Returns:
        model: trained LSTM model
        scaler: fitted MinMaxScaler
    """
    # Reshape and scale the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data.reshape(-1, 1))
    
    # Create sequences
    X, y = [], []
    for i in range(len(scaled_data) - lookback - forecast_horizon + 1):
        X.append(scaled_data[i:i+lookback, 0])
        y.append(scaled_data[i+lookback:i+lookback+forecast_horizon, 0])
    
    X, y = np.array(X), np.array(y)
    X = X.reshape(X.shape[0], X.shape[1], 1)
    
    # Build and train the LSTM model
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(lookback, 1)))
    model.add(LSTM(50))
    model.add(Dense(forecast_horizon))
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X, y, epochs=epochs, batch_size=32, verbose=1)
    
    # Save model and scaler
    model.save(MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    
    return model, scaler

def predict_future(model, scaler, last_sequence, forecast_horizon=7):
    """
    Predict future time steps
    
    Args:
        model: trained LSTM model
        scaler: fitted MinMaxScaler
        last_sequence: last observed sequence to use for prediction
        forecast_horizon: number of steps to forecast
    
    Returns:
        predictions: forecasted values
    """
    # Scale the input sequence
    scaled_sequence = scaler.transform(last_sequence.reshape(-1, 1))
    
    # Reshape for LSTM input
    scaled_sequence = scaled_sequence.reshape(1, len(scaled_sequence), 1)
    
    # Predict and inverse transform
    predicted_scaled = model.predict(scaled_sequence)
    predictions = scaler.inverse_transform(predicted_scaled)
    
    return predictions[0]

@app.route('/api/train', methods=['POST'])
def train_model():
    """API endpoint to train the LSTM model"""
    try:
        # Parse input data
        data = request.json.get('data')
        params = request.json.get('params', {})
        
        # Convert to numpy array
        time_series = np.array(data)
        
        # Train model
        lookback = params.get('lookback', 30)
        forecast_horizon = params.get('forecast_horizon', 7)
        epochs = params.get('epochs', 50)

        print("HORIZON IN TRAIN: " + str(forecast_horizon))
        
        model, scaler = create_and_train_model(
            time_series, 
            lookback=lookback,
            forecast_horizon=forecast_horizon,
            epochs=epochs
        )

        result = jsonify({
            'success': True,
            'message': 'Model trained successfully',
            'model_path': MODEL_PATH,
            'scaler_path': SCALER_PATH
        })

        # result.headers.add("Access-Control-Allow-Origin", "*")
        
        return result
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/forecast', methods=['POST'])
def forecast():
    """API endpoint to generate forecasts"""
    try:
        # Check if model exists
        if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
            print("model not found")
            return jsonify({
                'success': False,
                'error': 'Model not found. Please train the model first.'
            }), 400
        
        # Load model and scaler
        model = load_model(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        
        # Parse input data
        data = request.json.get('data')
        params = request.json.get('params', {})
        
        # Convert to numpy array
        last_sequence = np.array(data)
        forecast_horizon = params.get('forecast_horizon', 7)
        
        # Generate predictions
        predictions = predict_future(
            model, 
            scaler, 
            last_sequence,
            forecast_horizon
        )

        print("PYTHON HORIZON:" + str( forecast_horizon ));
        
        return jsonify({
            'success': True,
            'forecast': predictions.tolist(),
            'forecast_horizon': forecast_horizon
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
