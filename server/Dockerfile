# Use the official Node.js image as the base image
FROM node:18.20.3

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3004

# Start the application
CMD ["yarn", "dev"]
