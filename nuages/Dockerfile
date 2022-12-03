# Dockerfile for react app
FROM node:12.16.1-alpine
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
EXPOSE 3000
CMD ["yarn", "start"]