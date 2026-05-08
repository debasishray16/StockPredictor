FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./


# Install npm-check-updates globally to check for updated packages
RUN npm install -g npm-check-updates
# Run npm-check-updates to update the package.json file
RUN ncu -u

# Install all updated dependencies
RUN npm install
RUN npm install -g npm@latest

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]