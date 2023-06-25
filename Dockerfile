# Use an official Node.js runtime as a parent image
FROM node:18

WORKDIR /usr/src/app
#  Copy package.json
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install
COPY . .

# Expose the port that the app will run on (replace 3000 with your app's actual port number)
EXPOSE 3000

RUN npm run build