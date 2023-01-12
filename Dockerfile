FROM node:14.16.1

WORKDIR /back

COPY ./package.json /back

COPY ./package-lock.json /back

RUN npm install

RUN npm audit fix

COPY . /back

EXPOSE 4000

CMD ["npm", "run","start:prod"]
