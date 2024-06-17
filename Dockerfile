FROM node:lts-alpine 

WORKDIR /api

COPY . .

COPY package*.json ./

RUN npm install

RUN npm run build

EXPOSE 8000

CMD [ "npm", "start" ]
