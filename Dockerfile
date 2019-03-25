FROM node:10

RUN mkdir /code
WORKDIR /code
COPY . .
RUN npm install

ENTRYPOINT ["sh", "./.docker/entrypoint.sh"]
