FROM python:3.10-slim
WORKDIR /app
COPY . /app
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install -r requirements.txt --no-cache-dir
EXPOSE 8000
