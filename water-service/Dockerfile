# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy source code
COPY . .

# Expose service's port
EXPOSE 5001 

# Start the service
CMD ["node", "index.js"]