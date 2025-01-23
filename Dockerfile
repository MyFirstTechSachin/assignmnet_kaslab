# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Your app binds to port 3000, make sure the container does too
EXPOSE 3000

# Run 'npm run save' to generate a file and then start the application
CMD npm run save && npm start
