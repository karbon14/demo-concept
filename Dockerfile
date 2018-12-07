FROM node:10.14.1

WORKDIR /usr/src
COPY package-lock.json package.json
RUN npm install

COPY . .

EXPOSE 3000
ENV NODE_ENV production

RUN npm run build:ropsten

CMD ["npm", "run", "dev:ropsten"]
