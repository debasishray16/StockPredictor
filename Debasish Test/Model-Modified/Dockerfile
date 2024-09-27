FROM python:3.9-slim

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt --timeout=1000 --index-url https://pypi.python.org/simple/

EXPOSE 8501

CMD ["streamlit","run","app.py"]