FROM python:3.10-alpine
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN pip install pipenv
WORKDIR /app
COPY Pipfile Pipfile.lock /app/
RUN pipenv install --system --deploy
COPY . .
WORKDIR /app/openPharmaRest
EXPOSE 8000
CMD ["python", "manage.py", "runserver"]

