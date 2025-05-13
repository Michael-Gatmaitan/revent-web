import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.optimizers import Adam

def create_model(input_shape):
    model = Sequential([
        LSTM(50, activation='relu', input_shape=input_shape),
        Dense(1)
    ])
    model.compile(optimizer=Adam(learning_rate=0.001), loss='mse')
    return model

def prepare_data(data, window_size=5):
    X, y = [], []
    for i in range(len(data) - window_size):
        X.append(data[i:i + window_size])
        y.append(data[i + window_size])
    return np.array(X), np.array(y)

def predict_future_sales(quantity_array, num_days, window_size=5):
    data = np.array(quantity_array, dtype=np.float32)
    if len(data) <= window_size:
        raise ValueError("Not enough data to train model")

    X, y = prepare_data(data, window_size)
    X = X.reshape((X.shape[0], X.shape[1], 1))

    model = create_model((window_size, 1))
    model.fit(X, y, epochs=50, verbose=0)

    # Predict future
    last_window = data[-window_size:]
    predictions = []
    for _ in range(num_days):
        input_seq = last_window.reshape((1, window_size, 1))
        pred = model.predict(input_seq, verbose=0)[0][0]
        predictions.append(float(pred))
        last_window = np.append(last_window[1:], pred)

    return predictions

