# # Dockerfile for react app
# FROM node:16.15.1-alpine
# WORKDIR /app
# COPY package.json yarn.lock /app/
# RUN yarn install
# COPY . /app
# EXPOSE 3000
# CMD ["yarn", "start"]

FROM node:16.15.1-alpine as module-install
WORKDIR /app
COPY package.json yarn.lock /app/
# RUN apk add yarn
RUN yarn install --production

# BUILD
FROM node:16.15.1-alpine as build
COPY --from=module-install /app/node_modules/ /app/node_modules
WORKDIR /app
COPY . .
RUN yarn build 

# SERVE
FROM node:16.15.1-alpine as serve
COPY --from=build /app/build/ /app/build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "/app/build", "-l", "3000"]