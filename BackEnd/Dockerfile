FROM node:20-alpine

WORKDIR /backendapp

COPY package*.json ./

RUN npm install

COPY . /backendapp

CMD ["npm", "start"]
