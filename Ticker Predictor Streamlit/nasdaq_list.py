import pandas as pd
import csv

nasdaq_list = pd.read_csv("./nasdaq.csv")
symbol_list = nasdaq_list['Symbol'].tolist()

