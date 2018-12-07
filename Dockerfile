FROM node:9-alpine

ENV NODE_ENV production
ENV PORT 443

EXPOSE 443

RUN mkdir /app
WORKDIR /app

COPY package-lock.json package.json

RUN npm install

COPY . .

RUN build:ropsten

CMD ["npm", "run", "dev:ropsten"]