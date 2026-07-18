FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source
COPY . .

# Expose port
EXPOSE 8000

# Shell form so ${PORT} expands — Railway (and similar PaaS hosts) inject a
# dynamic PORT at runtime; a hardcoded port would be ignored. --reload is
# dev-only and is dropped here.
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
