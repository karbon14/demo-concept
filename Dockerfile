FROM node:10.14.1

ENV PORT 3000

EXPOSE 3000

WORKDIR /usr/src
COPY package-lock.json package.json

COPY . .

RUN npm install
RUN npm run build:ropsten

CMD ["npm", "run", "dev:ropsten"]
