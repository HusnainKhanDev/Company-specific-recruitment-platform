FROM node:20-alpine

WORKDIR /frontendapp

COPY package*.json ./

RUN npm install

COPY . /frontendapp

CMD ["npm", "run", "dev"]
