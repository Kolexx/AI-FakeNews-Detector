# Use official Node.js image as base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files into the container
COPY . .

# Expose the port the backend will run on (5000 for example)
EXPOSE 5000

# Set the environment variable (optional, can be done in docker-compose)
# ENV NODE_ENV=production  # Uncomment for production environment

# For development, use nodemon:
CMD ["npm", "run", "dev"]

# For production, you could change it to:
# CMD ["npm", "start"]
