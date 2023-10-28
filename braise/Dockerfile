FROM python:3.10-alpine
LABEL maintainer="Ouattara Idriss idrissgouattara@gmail.com"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ARG DB_ENGINE=django.db.backends.postgresql
ARG DB_NAME=openpharma
ARG DB_USER=postgres
ARG DB_PASSWORD=postgres
ARG DB_HOST=postgres
ARG DB_PORT=5432
ARG DEBUG False

COPY Pipfile Pipfile.lock /app/
WORKDIR /app
RUN pip install pipenv &&\
    pipenv install --system --deploy

# RUN echo "* * * * 5 ./cron-actualize.sh" >> /app/crontab

COPY . .
WORKDIR /app/openPharmaRest

RUN python manage.py crontab add

EXPOSE 8080
CMD crond && python manage.py runserver 0.0.0.0:8080

