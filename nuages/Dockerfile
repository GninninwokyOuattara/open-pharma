# Dockerfile for react app
FROM node:16.15.1-alpine
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app
EXPOSE 3000
CMD ["yarn", "start"]