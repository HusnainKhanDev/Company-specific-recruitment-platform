FROM node:18

WORKDIR /frontendapp

COPY ./dist .

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
