FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "nest", "start:prod" ]
