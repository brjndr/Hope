# 1) Build Stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json + package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# 2) Serve the build with 'serve'
FROM node:18-alpine

# Install 'serve' to serve the build
RUN npm install -g serve

# Set working directory
WORKDIR /app

#copy built files from the build stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 8080

# Run the app with Serve
CMD ["serve", "-s", "dist", "-l", "8080"]
