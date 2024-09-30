# Stock Prediction System

To run streamlit application:

1. Go to file directory ..Debasish Test\Previous Model

```bash
streamlit run app.py
```


To Access frontend side of project, cd into Utkarsh Test.

To Access backend side of project, cd into Debasish Test and Amal Test.

To Access and run project as a whole, cd into final_project.

2. For running final project.

- Go to directory in final project.

```cmd
cd "C:\Users\Debasish Ray\Desktop\stock\StockPredictor\final_project"
```

- Run the app file in streamlit.

```bash
streamlit run app.py
```

- Go to directory in stock_frontend

```bash
cd "stock_frontend"
```

- Run the scripts.

```bash
npm run start
```

- Then ,start the server by navigating in the file.
(final_project\stock_frontend\data_backend)

```cmd
cd data_backend
```

- Run node server

```bash
node server.js
```


## Results

![Frontend Integration](/Project%20Overview/images/Frontend.png)

![Backend Integration](/Project%20Overview/images/Backend.png)

![Backend Integration](/Project%20Overview/images/Frontend+Backend.png)

Note: This project is still in production and will not resemble the final product.



## Note (Information)

For this project, we have included a different repository with different models trained on different epoch cycles and parameters, which are usable and integratable in this project.
<a href="https://github.com/debasishray16/Stock-Prediction-Models"> Link to Model's Repository</a>



```shell
docker run debasishray/streamlit-app:v1.0
docker stop debasishray/streamlit-app:v1.0
```




## Github Packages

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