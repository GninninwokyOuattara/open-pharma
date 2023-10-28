FROM node:16.15.1-alpine as build
LABEL maintainer="gninninwokyouattara <idrissgouattaraonline@gmail.com>"

ARG BACKEND_ADDRESS localhost

ENV VITE_BACKEND_ADDRESS $BACKEND_ADDRESS
ENV VITE_BACKEND_PORT 8080
# ENV NODE_OPTIONS=--max_old_space_size=300
ENV GENERATE_SOURCEMAP=false

WORKDIR /app

COPY package.json yarn.lock  /app/
RUN yarn install
COPY . /app/
RUN yarn build

FROM nginx as server
COPY --from=build /app/dist/ /app/dist

EXPOSE 80 3000 8080
CMD ["nginx", "-g", "daemon off;"]