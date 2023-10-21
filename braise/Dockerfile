FROM python:3.10-alpine
LABEL maintainer="Ouattara Idriss idrissgouattara@gmail.com"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DB_ENGINE=django.db.backends.postgresql
ENV DB_NAME=openpharma
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_HOST=postgres
ENV DB_PORT=5432

COPY Pipfile Pipfile.lock /app/
WORKDIR /app
RUN pip install pipenv &&\
    pipenv install --system --deploy

COPY . .
WORKDIR /app/openPharmaRest
EXPOSE 8080
# CMD ["python", "manage.py", "runserver","0.0.0.0:8080"]
CMD crond && python manage.py runserver 0.0.0.0:8080

