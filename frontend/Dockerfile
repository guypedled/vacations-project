# Build stage
FROM node:20 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Build React app
RUN npm run build

# Serve stage
FROM node:20

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy build files
COPY --from=build /app/dist /app/dist

# Expose port
EXPOSE 5173

# Run app
CMD ["serve", "-s", "dist", "-l", "5173"]