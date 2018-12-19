FROM node:10.14.1

WORKDIR /usr/src
COPY package-lock.json package.json

COPY . .
RUN npm install

ENV NODE_ENV=production \
  HOME_URL=https://karbon14.org \
  NETWORK=31 \
  PORT=3000

RUN echo "NODE_ENV = $NODE_ENV | HOME_URL = $HOME_URL | NETWORK = $NETWORK | PORT = $PORT"

EXPOSE $PORT

RUN npm run build

CMD ["npm", "run", "start"]
