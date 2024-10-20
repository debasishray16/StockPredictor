import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
import numpy as np
import yfinance as yf
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime, timedelta

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
        df = yf.download(ticker, start=start, end=end)
        
        # Check if sufficient data is available
        if df.empty or len(df) < 100:
            return jsonify({"error": "Not enough data to calculate moving average."}), 400
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
    
    # Calculate 100-day moving average
    ma100 = df['Close'].rolling(window=100).mean().dropna()

    # Prepare the response, ensuring to align lengths
    closing_prices = df['Close'].values.tolist()
    mean_avg_100 = ma100.values.tolist()

    # Align lengths
    closing_prices = closing_prices[-len(mean_avg_100):]  # Adjust closing prices to match the length of the moving average

    response_data = {
        'predictions': y_predicted.flatten().tolist(),
        'original': y_test.flatten().tolist(),
        'closing_price': closing_prices,
        'mean_avg_100': mean_avg_100
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

        # Calculate the start date for the last 9 years
        end_date = datetime.now()
        start_date = end_date - timedelta(days=9*365)  # Approximate for leap years
        
        # Calculate the start date for the last 52 weeks (1 year)
        end_date2 = datetime.now()
        start_date2 = end_date - timedelta(weeks=52)

        # Fetch historical data for the last 9 years
        historical_data = stock.history(start=start_date, end=end_date)
        
        # Fetch historical data for the last 52 weeks
        historical_data2 = stock.history(start=start_date2, end=end_date2)

        # Get the most recent opening and closing prices
        latest_opening_price = historical_data['Open'].iloc[-1]
        latest_closing_price = historical_data['Close'].iloc[-1]

        # Calculate the maximum opening and closing prices till date
        max_opening_price = historical_data['Open'].max()
        max_closing_price = historical_data['Close'].max()
        
        # Calculate average high and low prices over the last 52 weeks
        avg_high_price = historical_data2['High'].mean()
        avg_low_price = historical_data2['Low'].mean()
        
        max_high_price = historical_data2['High'].max()
        max_low_price = historical_data2['Low'].min()
        
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
            "currency": currency,
            "openingPrice": latest_opening_price,
            "closingPrice": latest_closing_price,
            "max_opening_Price": max_opening_price,
            "max_closing_Price": max_closing_price,
            "max_high_price": max_high_price,
            "max_low_price": max_low_price,
            "avg_high_price": avg_high_price,
            "avg_low_price": avg_low_price
        }

        return jsonify(company_summary)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch company info for ticker {ticker}: {str(e)}"}), 400

if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000, debug=True)
    pass