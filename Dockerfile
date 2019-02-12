FROM node:8

RUN mkdir /code

WORKDIR /code

COPY . .

RUN npm install

EXPOSE 8010
