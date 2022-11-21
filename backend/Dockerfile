FROM node:16.15.1

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3030

CMD [ "yarn", "dev"]