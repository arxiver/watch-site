# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app will run on (replace 3000 with your app's actual port number)
EXPOSE 3000

# Set the environment variables for the MongoDB connection
ENV DB_USERNAME=root
ENV DB_PASSWORD=proot
ENV DB_HOST=0.0.0.0:27017
ENV DB_NAME=server_db
ENV DB_URL=mongodb://root:proot@mongo:27017/server_db?authSource=admin

# Start the app
CMD ["npm", "run", "start:dev"]