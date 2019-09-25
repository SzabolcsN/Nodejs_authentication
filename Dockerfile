FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start.dev" ]
