import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import yfinance as yf
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime, timedelta
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)  # Enable CORS

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

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    ticker = data.get('ticker')
    start = '2015-01-01'
    end = '2023-12-31'
    custom_start = data.get('start', '2015-01-01')
    custom_end = data.get('end', '2023-01-01')
 
    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400

    try:
        # Retrieve stock data from Yahoo Finance
        df = yf.download(ticker, start=start, end=end)
        df['Date'] = df.index

        # Check if sufficient data is available
        if df.empty or len(df) < 100:
            return jsonify({"error": "Not enough data to calculate moving average."}), 400
    except Exception as e:
        return jsonify({"error": f"Failed to fetch data for ticker {ticker}: {str(e)}"}), 400

    # Splitting the data into training and testing
    data_training = pd.DataFrame(df['Close'][0:int(len(df) * 0.70)])
    data_testing = pd.DataFrame(df['Close'][int(len(df) * 0.70):int(len(df))])

    scaler = MinMaxScaler(feature_range=(0, 1))

    # Load Model
    model = tf.keras.models.load_model('../model/8_15_23_300_LXg.h5', compile=False)

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
    
    # Date alignment
    testing_dates = df['Date'].iloc[int(len(df) * 0.70):].tolist()
    
    # Calculate 100-day moving average
    ma75 = df['Close'].rolling(window=75).mean().dropna()
    ma50 = df['Close'].rolling(window=50).mean().dropna()

    # Prepare the response, ensuring to align lengths
    closing_prices = df['Close'].values.tolist()
    mean_avg_50 = ma50.values.tolist()
    mean_avg_75 = ma75.values.tolist()

    # Align lengths
    closing_prices = closing_prices[-len(mean_avg_75):]  # Adjust closing prices to match the length of the moving average

    # Last 1-year prediction starting
    today = datetime.now().strftime('%Y-%m-%d')
    eight_year_ago = (datetime.now() - timedelta(days=365*8)).strftime('%Y-%m-%d')

    try:
        # Retrieve stock data from Yahoo Finance (8 year before today to today)
        df2 = yf.download(ticker, start=eight_year_ago, end=today)
        df2['Date'] = df2.index

        # Check if sufficient data is available
        if df2.empty or len(df2) < 100:
            return jsonify({"error": "Not enough data to calculate moving average."}), 400
    except Exception as e:
        return jsonify({"error": f"Failed to fetch data for ticker {ticker}: {str(e)}"}), 400

    # Prepare data for the model (Last 100 days for input)
    data_training2 = pd.DataFrame(df2['Close'][0:int(len(df2) * 0.70)])
    data_testing2 = pd.DataFrame(df2['Close'][int(len(df2) * 0.70):int(len(df2))])

    scaler2 = MinMaxScaler(feature_range=(0, 1))

    # Testing part (Using last 100 days from the current date)
    past_100_days2 = data_training2.tail(365)
    final_df2 = pd.concat([past_100_days2, data_testing2], ignore_index=True)
    

    input_data2 = scaler2.fit_transform(final_df2)
    

    x_test2 = []
    y_test2 = []

    for i in range(100, input_data2.shape[0]):
        x_test2.append(input_data2[i - 100: i])
        y_test2.append(input_data2[i, 0])
        
    

    x_test2, y_test2 = np.array(x_test2), np.array(y_test2)
    y_predicted2 = model.predict(x_test2)
    

    scaler2 = scaler2.scale_

    scale_factor2 = 1/scaler2[0]
    y_predicted2 = y_predicted2 * scale_factor2
    y_test2 = y_test2 * scale_factor2
    
    # Date alignment
    testing_dates2 = df2['Date'].iloc[int(len(df) * 0.70):].tolist()

    # 1 Month Future Prediction (using last 100 days)
    future_input = input_data2[-100:]
    future_predictions = []
    future_dates = pd.date_range(start=testing_dates2[-1], periods=30, freq='D')
    count = 0

    while count < 30:  # Predict for 30 days
        
        if future_input.shape[0] < 30:
            return jsonify({"error": "Not enough data for future predictions."}), 400

        # Ensure future_input is reshaped to (1, 100, 1)
        future_input_reshaped = future_input.reshape((1, 100, 1))
        future_pred = model.predict(future_input_reshaped)
        future_pred_rescaled = future_pred * scale_factor
        future_predictions.append(future_pred_rescaled.flatten().tolist()[0])

        # Prepare future_input for the next iteration
        # Remove the first value and append the predicted value
        future_input = np.append(future_input[1:], future_pred.reshape(1, -1), axis=0)

        # Ensure future_input retains the shape (100, 1)
        if future_input.shape[0] > 100:
            future_input = future_input[-100:]  # Keep only the last 100 entries
        future_input = future_input.reshape((100, 1))  # Reshape to (100, 1) if needed

        print(f"New shape of future_input after update: {future_input.shape}")
        count += 1

    # Generate Dates for x-axis (monthly scale)
    date_range = pd.date_range(start=eight_year_ago, periods=len(df2)+30, freq='D')
    months = pd.date_range(start=eight_year_ago, periods=len(df2)+30, freq='ME').strftime('%Y-%m').tolist()

    combined_predictions = y_predicted2.flatten().tolist() + future_predictions
    combined_dates = testing_dates2 +list(future_dates)
    
    padded_last_8cp = y_test2.flatten().tolist()

    response_data = {
        'predictions': y_predicted.flatten().tolist(),
        'original': y_test.flatten().tolist(),
        'closing_price': closing_prices,
        'mean_avg_75': mean_avg_75,
        'mean_avg_50': mean_avg_50,
        'original_last8': padded_last_8cp,
        'combined_predictions': combined_predictions,
        'combined_dates': combined_dates,
        'monthly_labels': months  
    }

    return jsonify(response_data)


if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=5000, debug=True)
    pass