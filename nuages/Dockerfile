
FROM node:16.15.1-alpine as build
LABEL maintainer="gninninwokyouattara <idrissgouattaraonline@gmail.com>"


ENV VITE_APP_DJANGO_API_URL http://localhost:8080
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install
COPY . .
RUN yarn build


FROM node:16.15.1-alpine as serve

WORKDIR /app
COPY --from=build /app/dist/ /app/dist
RUN npm install -g serve


EXPOSE 3000 4173
CMD ["serve", "-s", "/app/dist", "-l", "3000"]
