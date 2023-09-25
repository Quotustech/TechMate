FROM node:19 AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/client

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

EXPOSE 80
EXPOSE 3000


CMD ["sh","-c","npm run start"]