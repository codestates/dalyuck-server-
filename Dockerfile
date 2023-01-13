FROM node:14.16.1

WORKDIR /app

COPY package.json /app

RUN npm install --legacy-peer-deps

COPY . /app

CMD ["npm", "run", "start:dev"]

