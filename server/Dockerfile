  FROM node
  WORKDIR /server/
  RUN npm install express  
  COPY *.js .
  CMD ["http.server", "server.js","8000"]