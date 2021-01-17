FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

# EXPOSE 8089

CMD [ "node", "app.js" ]