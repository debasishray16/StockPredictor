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


keras.initializers.Orthogonal(gain=1.0, seed=None)

ops.reset_default_graph()

print(keras.__version__)
start = '2010-01-01'
end = '2019-12-31'


st.title('Stock Trend Prediction')

# Taking input from user.
user_input = st.text_input('Enter Stock Ticker', 'AAPL')

df = web.DataReader(user_input, 'stooq', start, end)
print(df)

# Describing Data
st.subheader('Data from 2010 - 2019')
st.write(df.describe())


st.subheader("Closing Price V/S Time Chart")

fig = plt.figure(figsize=(12, 6))

ax=plt.axes()
ax.set_facecolor('#C7E1F4')

plt.plot(df.Close, '#FF8F00', label='Closing Price')
plt.title('Multiple Lines Plot')
plt.legend()
plt.xlabel('Year')
plt.ylabel('Closing Price (USD)')
plt.xticks(rotation=45)

plt.grid(True, linestyle='--', color='#BDBDBD')
plt.tight_layout()

st.pyplot(fig)





st.subheader("Closing Price V/S Time Chart with 100MA")

ma100 = df.Close.rolling(100).mean()
fig = plt.figure(figsize=(12, 6))
ax = plt.axes()
ax.set_facecolor('#C7E1F4')

plt.grid(True, linestyle='--', color='#BDBDBD')
plt.tight_layout()

plt.title('Multiple Lines Plot')
plt.plot(df.Close, '#FF8F00', label='Closing Price')
# this is the mean of 100 values
plt.plot(ma100, 'g--', label='Mean (100 val)')

plt.legend()
plt.xlabel('Year')
plt.ylabel('Closing Price (USD)')

st.pyplot(fig)


st.subheader("Closing Price V/S Time Chart with 100MA and 200MA")
ma100 = df.Close.rolling(100).mean()
ma200 = df.Close.rolling(200).mean()
fig = plt.figure(figsize=(12, 6))
fig.patch.set_facecolor('#A59DDF')

ax = plt.axes()
ax.set_facecolor('#211970')

plt.grid(True, linestyle='--', color='#626784')
plt.xticks(rotation=45)


plt.plot(df.Close, '#A720C4', label='Closing Price')
plt.plot(ma100, 'g', label='Mean (100 val)')  # this is the mean of 100 values
plt.plot(ma200, 'r', label='Mean (200 val)')  # this is the mean of 200 values

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

model = tf.keras.models.load_model('keras_model.h5', compile=False)

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
