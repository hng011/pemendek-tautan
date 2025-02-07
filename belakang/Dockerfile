FROM python:3.12.8-slim

# Set environment variables for Cloud Run
ENV PYTHONUNBUFFERED=1 PORT=8000

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]