# Stock Prediction System

## Steps to run site

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

**Note: This project is still in production and will not resemble the final product.**

```shell
docker run debasishray/streamlit-app:v1.0
docker stop debasishray/streamlit-app:v1.0
```

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