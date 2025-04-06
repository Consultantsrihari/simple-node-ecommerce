# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install app dependencies
RUN npm install
# If you use yarn:
# RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable (optional, can be set via docker-compose or run command)
# ENV NODE_ENV production

# Run app.js when the container launches
CMD [ "node", "app.js" ]
