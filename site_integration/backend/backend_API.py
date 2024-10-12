import pandas_datareader.data as web
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
import numpy as np
import yfinance as yf
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    ticker = data.get('ticker')
    start = '2015-01-01'
    end = '2023-12-31'

    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400

    try:
        # Retrieve stock data from Yahoo Finance
        df = web.DataReader(ticker, 'stooq', start, end)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch data for ticker {ticker}: {str(e)}"}), 400

    # Splitting the data into training and testing
    data_training = pd.DataFrame(df['Close'][0:int(len(df) * 0.70)])
    data_testing = pd.DataFrame(df['Close'][int(len(df) * 0.70):int(len(df))])

    scaler = MinMaxScaler(feature_range=(0, 1))
    data_training_array = scaler.fit_transform(data_training)

    # Load Model
    model = tf.keras.models.load_model('../Model-Modified/8_15_23_125_LXg.h5', compile=False)

    # Testing part
    past_100_days = data_training.tail(100)
    final_df = pd.concat([past_100_days, data_testing], ignore_index=True)

    input_data = scaler.fit_transform(final_df)

    x_test = []
    y_test = []

    for i in range(100, input_data.shape[0]):
        x_test.append(input_data[i - 100: i])
        y_test.append(input_data[i, 0])

    x_test, y_test = np.array(x_test), np.array(y_test)
    y_predicted = model.predict(x_test)
    
    scaler = scaler.scale_

    scale_factor = 1/scaler[0]
    y_predicted = y_predicted * scale_factor
    y_test = y_test * scale_factor

    # Prepare the response
    response_data = {
        'predictions': y_predicted.flatten().tolist(), 
        'original': y_test.flatten().tolist()  # Convert to list for JSON serialization
    }

    return jsonify(response_data)


@app.route('/company_info', methods=['POST'])
def company_info():
    data = request.json
    ticker = data.get('ticker')

    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400

    try:
        # Fetch company info using yfinance
        stock = yf.Ticker(ticker)
        info = stock.info
        
        #Company info extraction
        company_name = info.get("longName", "Company name not available.")
        longBusinessSummary = info.get("longBusinessSummary", "No summary available.")
        sector = info.get("sector", "No sector information available.")
        industry = info.get("industry", "No industry information available.")
        fullTimeEmployees = info.get("fullTimeEmployees", "No employee data available.")
        website = info.get("website", "No website available.")
        marketCap = info.get("marketCap", "No market cap available.")
        currency = info.get("currency", "N/A")
        
        # Extract only the longBusinessSummary
        company_summary = {
            "company_name": company_name,
            "longBusinessSummary": longBusinessSummary,
            "sector": sector,
            "industry": industry,
            "fullTimeEmployees": fullTimeEmployees,
            "website": website,
            "marketCap": marketCap,
            "currency": currency
        }

        return jsonify(company_summary)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch company info for ticker {ticker}: {str(e)}"}), 400

if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000, debug=True)
    pass