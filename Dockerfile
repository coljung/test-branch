FROM node:8

RUN mkdir /code

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8010

CMD ["npm", "start"]
