# Stock Ticker Analysis and Prediction System using Stacked LSTM

## Description

- Our project works on concepts of deep learning to predict values based on time-series model. It includes use of LSTM (Long Short Term Memory) with XG-Boost to enhance the performance of prediction.

- This repository invloves deployment of model with **two-interfaces**.
One with <kbd>Streamlit-App</kbd>  [**[Link](https://ticker-prediction-app-tpa.streamlit.app/)**] and <kbd> React App </kbd>

## Install and Run the project

### 1. Running project for first time

To run our site. Follow the steps -

- Navigate to **site_integration** folder.

```cmd
 cd "site_integration"
```

- Run following command if project is cloned for first time. *This will install necessary node_modules folder in current folder.*

```bash
npm install
```

```bash
npm run start
```

- Simultaneously, Run a **command in another terminal** to start <kbd>waitress_server.py</kbd> file in <kbd>/backend/waitress_server.py</kbd> folder.

```bash
python waitress_server.py
```

![terminal_Screenshot](assets/images/terminal_screenshot.png)

### Site Image

![website_Preview](assets/images/Website_Preview.png)

### 2. Running project on local system

**No need to type npm install**.
Just type

```bash
cd "site_integration"
npm run start
```

- Simultaneously, Run a **command in another terminal** to start <kbd>waitress_server.py</kbd> file in <kbd>/backend/waitress_server.py</kbd> folder.

```bash
python waitress_server.py
```

**Note: This project is still in production and will not resemble the final product.**

## Steps to deploy on Github Packages

1. Create a replica of Docker image with different tag.
2. Check the image created.
3. Authenticate by using **PAT (Personal Access Token)**.
4. Push that image in GitHub Packages.

```bash
docker tag debasishray/streamlit-app:v1.0 webapp

docker tag webapp ghcr.io/debasishray16/stockpredictor/webapp:latest
docker image ls

# For authentication
echo "pat-value" | docker login ghcr.io -u debasishray16 --password-stdin

# ghcr.io/<username>/<repository>
docker push ghcr.io/debasishray16/stockpredictor/webapp:latest
```

## Note (Information)

For this project, we have included a different repository with different models trained on different epoch cycles and parameters, which are usable and integratable in this project.

**<a href="https://github.com/debasishray16/Stock-Prediction-Models"> Link to Model's Repository</a>**

```shell
docker run debasishray/streamlit-app:v1.0
docker stop debasishray/streamlit-app:v1.0
```

## Docker Compose

Two ways to run Docker Compose:

- To run docker compose in folder location.

```bash
git clone https://github.com/debasishray16/StockPredictor.git

docker pull debasishray/predictor-backend:v1.0
docker pull debasishray/predictor-frontend:v1.0

# In detached mode
docker-compose up -d
```


### Contributors

<div align="right">
 <a href="https://github.com/debasishray16/StockPredictor/graphs/contributors">
   <img src="https://contrib.rocks/image?repo=debasishray16/StockPredictor" />
 </a>
</div>
