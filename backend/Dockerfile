# Use Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose backend port
EXPOSE 3001

# Start server
CMD ["npm", "start"]