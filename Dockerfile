FROM node:10

ARG LIB_DIR
ENV LIB_DIR ${LIB_DIR}

RUN mkdir /code
WORKDIR /code
COPY . .

RUN npm install --loglevel verbose -g webpack webpack-cli webpack-dev-server config
RUN npm install --loglevel verbose

ENTRYPOINT ["sh", "./.docker/entrypoint.sh"]
