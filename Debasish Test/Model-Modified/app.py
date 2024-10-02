import pandas_datareader.data as web
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import pandas_datareader as data

import keras
from keras.initializers import Orthogonal
from keras.optimizers import SGD
from keras.models import load_model

import streamlit as st

from sklearn.preprocessing import MinMaxScaler

import tensorflow as tf
from tensorflow.python.framework import ops
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import Dense, Flatten, GlobalAveragePooling2D, Activation
import tensorflow.compat.v2 as tf

import streamlit as st
import yfinance as yf
from requests.exceptions import HTTPError

from streamlit_lottie import st_lottie

keras.initializers.Orthogonal(gain=1.0, seed=None)

ops.reset_default_graph()

print(keras.__version__)
start = '2015-01-01'
end = '2023-01-01'

# Page Layout
st.set_page_config(
    page_title="Stock-Prediction System",
    layout="centered"
)

st.title('Stock Trend Prediction')

# Taking input from user.
ticker_list = ["JPM", "GOOG", "AAPL", "MMM"]
user_input = st.selectbox(
    "Enter Stock Ticker",
    ticker_list,
    index=None,
    placeholder="Ticker",
)

if user_input == None:
    print("No ticker Entered")
else:
    df = web.DataReader(user_input, 'stooq', start, end)



def get_company_description(ticker_symbol):
    try:
        # Fetch company info from yfinance
        ticker_data = yf.Ticker(ticker_symbol)
        company_info = ticker_data.info

        # Extract the company description
        company_description = company_info.get(
            'longBusinessSummary', 'Description not available for this company.')

        return company_description

    except HTTPError as e:
        print(f"Error retrieving company description: {e}")

    except Exception as e:
        return f"Error retrieving company description: {str(e)}"


if user_input:

    # Fetch company description
    company_description = get_company_description(user_input)
    st.subheader(f"Company Description for {user_input}")
    
    # Apply justified text using custom HTML and CSS
    st.markdown(f"""
        <div style='text-align: justify; font-size: 16px;'>
            {company_description}
        </div>
    """, unsafe_allow_html=True)
    
    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

tab1, tab2, tab3 ,tab4 = st.tabs(
    ["Ticker Info.", "Close-Feature", "Open-Feature", "Charts"]
)

with tab1:
    import streamlit.components.v1 as components
    
    with st.echo():
        st_lottie("https://lottie.host/7aeb01e2-f5e7-4cdc-9849-f992f90aae13/Igkjy3ONSC.json")
    
    # Add subtitle
    SUB_TITLE = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Stock Tickers Info</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 40px;
                background-color: #f4f4f9;
            }
            table {
                width: 80%;
                margin: 20px auto;
                border-collapse: collapse;
            }
            th, td {
                padding: 12px;
                border: 1px solid #ccc;
                text-align: left;
            }
            th {
                background-color: #4CAF50;
                color: white;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
            .container {
                width: 90%;
                margin: auto;
                background-color: white;
                padding: 20px;
                box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Stock Tickers Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>AAPL</td>
                        <td>Apple Inc.</td>
                        
                    </tr>
                    <tr>
                        <td>GOOGL</td>
                        <td>Alphabet Inc.</td>
                        
                    </tr>
                    <tr>
                        <td>AMZN</td>
                        <td>Amazon.com Inc.</td>
                        
                    </tr>
                    <tr>
                        <td>JPM</td>
                        <td>JPMorgan Chase & Co.</td>
                        
                    </tr>
                    <tr>
                        <td>MPZ</td>
                        <td>Medical Properties Trust, Inc.</td>
                        
                    </tr>
                    <tr>
                        <td>ARCC</td>
                        <td>Ares Capital Corporation</td>
                        
                    </tr>
                    <tr>
                        <td>MMM</td>
                        <td>3M Company</td>
                        
                    </tr>
                    <tr>
                        <td>MGK</td>
                        <td>Vanguard Mega Cap Growth Index Fund</td>
                        
                    </tr>
                    <tr>
                        <td>IEP</td>
                        <td>Icahn Enterprises L.P.</td>
                    </tr>
                    
                    <tr>
                        <td>AAP</td>
                        <td>Advance Auto Parts, Inc.</td>
                        
                    </tr>
                    <tr>
                        <td>ACEL</td>
                        <td>Accel Entertainment, Inc.</td>
                        
                    </tr>
                    <tr>
                        <td>ACM</td>
                        <td>Icahn Enterprises L.P.</td>
                    </tr>
                    <tr>
                        <td>ABDE</td>
                        <td>Adobe Inc.</td>
                    </tr>
                    <tr>
                        <td>ADSK</td>
                        <td>Autodesk, Inc.</td>
                    </tr>
                    <tr>
                        <td>ATO</td>
                        <td>Atmos Energy Corporation</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    </html>

    """
    components.html(SUB_TITLE, height=1000)

with tab2:
    st.subheader("Close-Feature")
    st.write("Close feature in a stock prediction system refers to the closing price of a stock for a given trading day. It is the final price at which the stock is traded when the market closes. The closing price is often considered the most important price of the day because it reflects the stock’s value at the end of the trading session and is frequently used as a benchmark for stock performance analysis.")
    st.subheader("Dataset Overview")
    st.write(df)
    st.text(df.size)

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    # Describing Data
    st.subheader('Data Overview from 2015 - 2023')
    st.text(
        "This section gives the overview of the dataset which shows different columns.")
    st.write(df.describe())

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    st.subheader("[Closing Price V/S Time] Chart")
    fig = plt.figure(figsize=(12, 6))

    ax = plt.axes()
    ax.set_facecolor('#C7E1F4')

    plt.plot(df.Close, '#FF8F00', label='Closing Price')
    plt.title(user_input + ' Stock plot')
    plt.legend()
    plt.xlabel('Year')
    plt.ylabel('Closing Price (USD)')
    plt.xticks(rotation=45)

    plt.grid(True, linestyle='--', color='#BDBDBD')
    plt.tight_layout()
    st.pyplot(fig)

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    st.subheader("[Closing Price V/S Time] Chart with 100MA")

    ma100 = df.Close.rolling(100).mean()
    ma50 = df.Close.rolling(50).mean()
    ma75 = df.Close.rolling(75).mean()
    fig = plt.figure(figsize=(12, 6))
    ax = plt.axes()
    ax.set_facecolor('#C7E1F4')

    plt.grid(True, linestyle='--', color='#BDBDBD')
    plt.tight_layout()

    plt.title('Multiple Lines ' + user_input + ' Stock plot')
    plt.plot(df.Close, '#2a04e8', label='Closing Price')
    # this is the mean of 100 values
    plt.plot(ma100, '#43f104', label='Mean (100 val)')
    plt.plot(ma50, 'y', label='Mean (50 val)')
    plt.plot(ma75, '#f104c8', label='Mean (75 val)')

    plt.legend()
    plt.xlabel('Year')
    plt.ylabel('Closing Price (USD)')

    st.pyplot(fig)

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    st.subheader("[Closing Price V/S Time] Chart with 100MA and 200MA")
    ma100 = df.Close.rolling(100).mean()
    ma200 = df.Close.rolling(200).mean()
    ma50 = df.Open.rolling(50).mean()
    ma75 = df.Open.rolling(75).mean()
    fig = plt.figure(figsize=(12, 6))
    fig.patch.set_facecolor('#A59DDF')

    ax = plt.axes()
    ax.set_facecolor('#211970')

    plt.grid(True, linestyle='--', color='#626784')
    plt.xticks(rotation=45)

    plt.plot(df.Close, '#A720C4', label='Closing Price')
    # this is the mean of 100 values
    plt.plot(ma100, 'g', label='Mean (100 val)')
    # this is the mean of 200 values
    plt.plot(ma200, 'r', label='Mean (200 val)')
    plt.plot(ma50, 'y', label='Mean (50 val)')
    plt.plot(ma75, '#f104c8', label='Mean (75 val)')

    plt.legend()
    plt.xlabel('Date')
    plt.ylabel('Closing Price ($)')

    st.pyplot(fig)

    # splitting the data into training and testing
    data_training = pd.DataFrame(df['Close'][0:int(len(df)*0.70)])
    data_testing = pd.DataFrame(df['Close'][int(len(df)*0.70):int(len(df))])

    scaler = MinMaxScaler(feature_range=(0, 1))
    data_training_array = scaler.fit_transform(data_training)

    # Load Model

    model = tf.keras.models.load_model('8_15_23_125_LXg.h5', compile=False)

    # Testing part
    past_100_days = data_training.tail(100)
    final_df = pd.concat([past_100_days, data_testing], ignore_index=True)

    input_data = scaler.fit_transform(final_df)

    x_test = []
    y_test = []

    for i in range(100, input_data.shape[0]):
        x_test.append(input_data[i-100: i])
        y_test.append(input_data[i, 0])

    x_test, y_test = np.array(x_test), np.array(y_test)
    y_predicted = model.predict(x_test)

    scaler = scaler.scale_

    scale_factor = 1/scaler[0]
    y_predicted = y_predicted * scale_factor
    y_test = y_test * scale_factor

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    # Final Graph
    st.subheader('Prediction V/S Original')
    fig2 = plt.figure(figsize=(12, 6))
    fig2.patch.set_facecolor('#A59DDE')

    ax = plt.axes()
    ax.set_facecolor('#C7E1F4')

    plt.grid(True, linestyle='--', color='#626784')
    plt.plot(y_test, 'g', label="Original price")
    plt.plot(y_predicted, 'r', label="Predicted price")

    plt.title("Plot between Original and Predicted Stock Price")
    plt.xlabel('No of Days')
    plt.ylabel('Stock Price($)')
    plt.legend()
    plt.show()

    st.pyplot(fig2)

with tab3:
    st.subheader("Open-Feature")
    st.write("Open feature in a stock prediction system refers to the opening price of a stock for a given trading day. The opening price is typically the price at which the stock first trades when the market opens. It is an essential feature in stock prediction datasets, as it often reflects the initial market sentiment and can serve as a predictor of the stock's performance for the rest of the day.")
    st.subheader("Dataset Overview of " + user_input + " Ticker")
    st.write(df)
    st.text(df.size)

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    # Describing Data
    st.subheader('Data Overview from 2015 - 2023')
    st.text(
        "This section gives the overview of the dataset which shows different columns.")
    st.write(df.describe())

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    st.subheader("[Opening Price V/S Time] Chart")
    fig_open = plt.figure(figsize=(12, 6))

    ax = plt.axes()
    ax.set_facecolor('#C7E1F4')

    plt.plot(df.Open, '#FF8F00', label='Opening Price')
    plt.title(user_input + ' Stock plot')
    plt.legend()
    plt.xlabel('Year')
    plt.ylabel('Opening Price (USD)')
    plt.xticks(rotation=45)

    plt.grid(True, linestyle='--', color='#BDBDBD')
    plt.tight_layout()
    st.pyplot(fig)

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    st.subheader("[Closing Price V/S Time] Chart with 100MA")

    ma100 = df.Open.rolling(100).mean()
    ma50 = df.Open.rolling(50).mean()
    ma75 = df.Open.rolling(75).mean()
    fig_open = plt.figure(figsize=(12, 6))
    ax = plt.axes()
    ax.set_facecolor('#C7E1F4')

    plt.grid(True, linestyle='--', color='#BDBDBD')
    plt.tight_layout()

    plt.title('Multiple Lines ' + user_input + ' Stock plot')
    plt.plot(df.Open, '#2a04e8', label='Opening Price')
    # this is the mean of 100 values
    plt.plot(ma100, '#43f104', label='Mean (100 val)')
    plt.plot(ma50, 'y', label='Mean (50 val)')
    plt.plot(ma75, '#f104c8', label='Mean (75 val)')

    plt.legend()
    plt.xlabel('Year')
    plt.ylabel('Opening Price (USD)')

    st.pyplot(fig_open)

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    st.subheader("[Opening Price V/S Time] Chart with 100MA and 200MA")
    ma50 = df.Open.rolling(50).mean()
    ma75 = df.Open.rolling(75).mean()
    ma100 = df.Open.rolling(100).mean()
    ma200 = df.Open.rolling(200).mean()
    fig_open = plt.figure(figsize=(12, 6))
    fig_open.patch.set_facecolor('#A59DDF')

    ax = plt.axes()
    ax.set_facecolor('#211970')

    plt.grid(True, linestyle='--', color='#626784')
    plt.xticks(rotation=45)

    plt.plot(df.Open, '#A720C4', label='Opening Price')
    plt.plot(ma50, 'y', label='Mean (50 val)')
    plt.plot(ma75, 'c', label='Mean (75 val)')
    plt.plot(ma100, 'g', label='Mean (100 val)')
    plt.plot(ma200, 'r', label='Mean (200 val)')

    plt.legend()
    plt.xlabel('Date')
    plt.ylabel('Opening Price ($)')

    st.pyplot(fig_open)

    # splitting the data into training and testing
    data_training = pd.DataFrame(df['Close'][0:int(len(df)*0.70)])
    data_testing = pd.DataFrame(df['Close'][int(len(df)*0.70):int(len(df))])

    scaler = MinMaxScaler(feature_range=(0, 1))
    data_training_array = scaler.fit_transform(data_training)

    # Load Model

    model1 = tf.keras.models.load_model(
        '8_15_23_125_open_LXg.h5', compile=False)

    # Testing part
    past_100_days = data_training.tail(100)
    final_df = pd.concat([past_100_days, data_testing], ignore_index=True)

    input_data = scaler.fit_transform(final_df)

    x_test = []
    y_test = []

    for i in range(100, input_data.shape[0]):
        x_test.append(input_data[i-100: i])
        y_test.append(input_data[i, 0])

    x_test, y_test = np.array(x_test), np.array(y_test)
    y_predicted = model1.predict(x_test)

    scaler = scaler.scale_

    scale_factor = 1/scaler[0]
    y_predicted = y_predicted * scale_factor
    y_test = y_test * scale_factor

    st.markdown('<hr style="border:2px solid #00457C;">',
                unsafe_allow_html=True)

    # Final Graph
    st.subheader('Prediction V/S Original')
    fig_open2 = plt.figure(figsize=(12, 6))
    fig_open2.patch.set_facecolor('#A59DDE')

    ax = plt.axes()
    ax.set_facecolor('#C7E1F4')

    plt.grid(True, linestyle='--', color='#626784')
    plt.plot(y_test, 'g', label="Original price")
    plt.plot(y_predicted, 'r', label="Predicted price")

    plt.title("Plot between Original and Predicted Stock Price")
    plt.xlabel('No of Days')
    plt.ylabel('Stock Price($)')
    plt.legend()
    plt.show()

    st.pyplot(fig_open2)

with tab4:
    st.subheader(f"Charts: {user_input}")

    st.line_chart(df.Close)
    st.line_chart(df.Open)
    st.line_chart(df.Volume)
    st.line_chart(df.High)
    st.line_chart(df.Low, color="#fd0")
