import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import pandas_datareader as data
from keras.models import load_model
import streamlit as st


import pandas_datareader.data as web
start = '2010-01-01'
end = '2019-12-31'


st.title('Stock Trend Prediction')

user_input = st.text_input('Enter Stock Ticker','AAPL')

df = web.DataReader(user_input, 'stooq', start, end)


# Describing Data
st.subheader('Data from 2010 - 2019')
st.write(df.describe())
