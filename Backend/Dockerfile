FROM python:3.11-slim

WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --upgrade pip

EXPOSE 5000

ENV NAME World

CMD ["python","waitress_server.py"]