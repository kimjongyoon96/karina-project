

# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run compile

# Expose the port the app runs on
EXPOSE 4000

# Command to run the app
CMD ["npm", "start"]
