from flask import Flask, json, request, jsonify
from model_utils import predict_future_sales
from sqlalchemy import create_engine, text
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ MySQL connection string
DATABASE_URL = "mysql+pymysql://root:@localhost:3306/shop_inventory"
engine = create_engine(DATABASE_URL)

DURATION_MAP = {
    "1 week": 7,
    "1 month": 30,
    "2 months": 60,
    "3 months": 90,
    "6 months": 180
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        itemNumber = data.get('itemNumber')
        duration = data.get('duration', '').lower()

        if duration not in DURATION_MAP:
            return jsonify({ 'error': f'Invalid duration. Valid options are: { list(DURATION_MAP.keys())}'}), 400

        numOfDays = DURATION_MAP[duration]

        # if not isinstance(itemNumber, int) or not isinstance(num_of_days, int):
        #     return jsonify({'error': 'Invalid input format'}), 400

        # ✅ Fetch quantity history from MySQL
        with engine.connect() as conn:
            result = conn.execute(text("""
                SELECT quantity FROM sale
                WHERE itemNumber = :itemNumber
                ORDER BY saleDate ASC
            """), {"itemNumber": itemNumber})
            quantities = [row.quantity for row in result]

        if len(quantities) < 6:
            return jsonify({'error': 'Not enough historical data for prediction'}), 400

        predictions = predict_future_sales(quantities, numOfDays)
        return jsonify({
            'saleHistory': quantities,
            'predictedQuantities': predictions,
            'numOfDays': numOfDays,
            'durationRequested': duration
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
