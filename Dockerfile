FROM node:latest

RUN  mkdir -p /usr/apimoodshop

WORKDIR /usr/apimoodshop

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8089

CMD [ "node", "app.js" ]