FROM node:16-alpine

WORKDIR /react-native-app

COPY . .

RUN yarn install

RUN npm install -g expo-cli

EXPOSE 19000

EXPOSE 19001

EXPOSE 19002

EXPOSE 19006

CMD [ "npm", "run", "start" ]