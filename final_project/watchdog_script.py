import streamlit as st
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import os

# Function to rerun Streamlit app
def rerun_streamlit():
    os.system("streamlit run app.py --server.runOnSave True")

# Watchdog event handler
class JSONFileHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith('stock_frontend/data_backend/variable_data.json'):
            rerun_streamlit()

# Main function
def main():
    # Initialize Watchdog observer
    observer = Observer()
    observer.schedule(JSONFileHandler(), path='.')
    observer.start()

    # Run Streamlit app
    st.write("Streamlit app running...")

if __name__ == "__main__":
    main()
