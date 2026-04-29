# Stock Ticker Analysis and Prediction System using Stacked LSTM

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-Deep%20Learning-orange)](https://www.tensorflow.org/)
[![XGBoost](https://img.shields.io/badge/XGBoost-Ensemble-red)](https://xgboost.readthedocs.io/)
[![Streamlit](https://img.shields.io/badge/Streamlit-Web%20App-green)](https://streamlit.io/)
[![React](https://img.shields.io/badge/React-Frontend-61dafb)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 📋 About

**Ticker-Prediction System** is an advanced machine learning project that leverages **LSTM (Long Short Term Memory)** neural networks combined with **XGBoost** ensemble methods to predict stock market trends using time-series analysis.

### Key Features

- 🤖 **Deep Learning Architecture**: Stacked LSTM model for capturing temporal dependencies in stock data
- 📊 **Data Preprocessing**: Advanced techniques for continuous dataset normalization and transformation
- 🚀 **Ensemble Method**: XGBoost integration to enhance prediction accuracy
- 🎨 **Dual Interface**: Both Streamlit web app and React-based frontend
- 🐳 **Docker Support**: Containerized deployment with version tracking
- 📈 **Time-Series Prediction**: Sophisticated forecasting for financial data

> **Note**: All research, testing, and model training work are maintained in a [separate repository](https://github.com/debasishray16/Stock-Prediction-Models) with different epoch cycles and parameters.

## 📖 Description

This project combines cutting-edge deep learning techniques with practical deployment strategies:

- **Core Technology**: LSTM networks with XGBoost ensemble methods for superior prediction performance
- **Multiple Interfaces**:
  - [**Streamlit Application**](https://ticker-prediction-app-tpa.streamlit.app/) - Quick web-based interface
  - **React Application** - Full-featured frontend with advanced UI/UX
- **Containerization**: Docker images for consistent deployment across environments with semantic versioning

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- Docker (optional, for containerized deployment)
- Git

### 1. Local Installation

#### Frontend (React)

Navigate to the Ticker Predictor Website folder:

```bash
cd "Ticker Predictor Website"
cd "Front-end"
npm install
npm run start
```

The React app will be available at `https://localhost:3000`

#### Backend (Python)

In a separate terminal, navigate to the Backend folder:

```bash
cd "Ticker Predictor Website"
cd "Backend"
python waitress_server.py
```

The backend server will connect with the React frontend automatically.

**Visual Guide:**

```
Terminal Output Example:
✓ Backend running on http://localhost:5000
✓ Frontend running on http://localhost:3000
✓ Connected and ready for predictions
```

### 2. Docker Deployment

#### Option A: React + Python Backend

**Terminal 1 - Backend:**
```bash
docker run -p 5000:5000 debasishray/predictor-backend:latest
```

**Terminal 2 - Frontend:**
```bash
docker run -p 3000:3000 debasishray/predictor-frontend:latest
```

Then navigate to: `https://localhost:3000`

#### Option B: Streamlit Application

```bash
docker run -p 8501:8501 debasishray/streamlit-app:latest
```

Access the app via the link provided in the terminal output.

## 🐳 Docker Image Deployment to GitHub Packages

### Step-by-Step Guide

1. **Create a Docker image replica with a new tag:**

```bash
docker tag debasishray/streamlit-app:v1.0 webapp
```

2. **Tag for GitHub Container Registry:**
   
```bash
docker tag webapp ghcr.io/debasishray16/stockpredictor/webapp:latest
docker image ls
```

3. **Authenticate with GitHub Packages:**
   
```bash
echo "YOUR_PAT_TOKEN" | docker login ghcr.io -u debasishray16 --password-stdin
```

4. **Push to GitHub Packages:**

```bash
docker push ghcr.io/debasishray16/stockpredictor/webapp:latest
```

> **Format**: `ghcr.io/<username>/<repository>/<image>:tag`

## 📊 Project Structure

```
StockPredictor/
├── Ticker Predictor Website/
│   ├── Front-end/          # React application
│   ├── Backend/            # Python Flask/Waitress server
│   └── models/             # Trained LSTM & XGBoost models
├── Dockerfile              # Container configuration
└── README.md              # This file
```

## 🔗 Related Resources

- **Model Training Repository**: [Stock-Prediction-Models](https://github.com/debasishray16/Stock-Prediction-Models)
- **Live Streamlit App**: [Ticker Prediction - Streamlit](https://ticker-prediction-app-tpa.streamlit.app/)
- **Model Research**: Various epoch cycles and parameter configurations available in training repo

## 👥 Contributors

<div align="center">
 <a href="https://github.com/debasishray16/StockPredictor/graphs/contributors">
   <img src="https://contrib.rocks/image?repo=debasishray16/StockPredictor" />
 </a>
</div>

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support & Contributing

For questions, suggestions, or issues:
- Open an [Issue](https://github.com/debasishray16/StockPredictor/issues)
- Check the [Model Training Repository](https://github.com/debasishray16/Stock-Prediction-Models) for research details

---

**Last Updated**: 2026-04-29 | **Status**: Active Development