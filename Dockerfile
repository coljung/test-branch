FROM node:10-slim

# Create app directory
WORKDIR /code

COPY package.json .npmrc ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 80

CMD ["npm", "start"]
