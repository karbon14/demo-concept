FROM tarampampam/node:10.10-alpine
WORKDIR /usr/src

# what port is exposed
EXPOSE 443

# copy files required for building
COPY ./ .

# install deps
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install

RUN npm rebuild node-sass

# build Next app
ENV NODE_ENV="production" HOME_URL="https://karbon14.org" NETWORK="3"
RUN npm run build:ropsten

# copy our main application source
COPY server.js .

# run a HTTP server
CMD ["node", "server.js"] 