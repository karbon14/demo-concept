FROM node:10.14.1

WORKDIR /usr/src
COPY package-lock.json package.json

COPY . .

RUN npm install

EXPOSE 3000
ENV NODE_ENV production

RUN npm run build:ropsten
RUN npm prune

CMD ["npm", "run", "dev:ropsten"]
