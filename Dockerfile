FROM node:10

RUN npm install -g webpack webpack-cli webpack-dev-server config

RUN mkdir /component-library
RUN mkdir /usr/src/app

WORKDIR /usr/src/app
COPY . .
RUN npm install

ENTRYPOINT ["sh", "./.docker/entrypoint.sh"]
