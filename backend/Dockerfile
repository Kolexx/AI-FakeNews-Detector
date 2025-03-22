# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend folder
COPY . .

# Expose the port
EXPOSE 5000

# Start the server
CMD ["node", "app.js"]
