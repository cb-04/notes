# Base image from hub.docker.com
FROM node:alpine

#app directory to hold app specific files
WORKDIR /app

#app install dependencies
COPY ./package*.json ./
RUN npm install

#copy compiled files
COPY ./dist ./dist

#Startup Command
CMD [ "node", "./dist/index.js" ]