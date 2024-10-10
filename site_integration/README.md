# Stock Prediction System

To run main site:

1. Start with directly running the react app.

```bash
npm run start
```

2. Then, start backend server.

- cd into file diretory "backend".

```cmd
cd "backend"
```

a. (Using development server)

- Make sure in the last `if` statement in backend_API.py, `pass` is commented out. And `app.run()` function is not commented. If otherwise, do vice-versa.

- Then, start the file.

```bash
python backend_API.py
```

This will start a development backend server using `flask`.

b. (Using deployment server)

- Make sure in the last `if` statement in backend_API.py, `pass` is not commented out. And `app.run()` function is commented. If otherwise, do vice-versa.

- Then, start the file.

```bash
waitress-serve --listen=127.0.0.1:5000 backend_API:app
```

This will start a deployment backend server using `waitress-serve`. Wsitress is a cross-platform WSGI server used for deployment servers for Flask apps.

- Enjoy cruising on site. Be sure to check company stocks and correct tickers.
