FROM node:16.15.1-alpine as build
LABEL maintainer="gninninwokyouattara <idrissgouattaraonline@gmail.com>"

ENV VITE_BACKEND_ADDRESS http://localhost
ENV VITE_BACKEND_PORT 8080
# ENV NODE_OPTIONS=--max_old_space_size=300
ENV GENERATE_SOURCEMAP=false

WORKDIR /app

COPY package.json yarn.lock  /app/
RUN yarn install
COPY . /app/
RUN yarn build

# FROM node:16.15.1-alpine as server

# WORKDIR /app
# COPY --from=build /app/dist/ /app/dist/
# RUN npm install -g serve
FROM nginx as server
COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]