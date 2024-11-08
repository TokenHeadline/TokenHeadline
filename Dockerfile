# Use Node.js 18 Alpine image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for dependency installation
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]
