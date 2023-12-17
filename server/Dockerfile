FROM node:alpine

WORKDIR /app/

# Download `vue.js` to serve locally - without this an internet connection is required
#RUN apk add --no-cache \
#    curl
#RUN curl https://unpkg.com/vue@next -L -o vue.js

COPY package.json ./
RUN npm install

COPY . .

ENTRYPOINT ["node", "server.js"]