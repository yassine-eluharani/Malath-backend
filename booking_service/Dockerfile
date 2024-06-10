# Use the official Node.js 14 image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
RUN npx prisma generate

# Expose the port on which the application will run
EXPOSE 3003

# Start the application
CMD ["npm", "run", "dev"]
