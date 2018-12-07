FROM node:9-alpine

ENV PORT 3000

EXPOSE 3000

WORKDIR /usr/src
COPY package-lock.json package.json

RUN npm install

COPY . .

RUN npm run build:ropsten

CMD ["npm", "run", "dev:ropsten"]
