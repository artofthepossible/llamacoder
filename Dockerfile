# syntax=docker/dockerfile:1

ARG NODE_VERSION=19.4.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Install dependencies
FROM base AS deps

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

################################################################################
# Build the application
FROM base AS build

# Copy the installed dependencies from the deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy the rest of the source files into the image
COPY . .

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
FROM base AS runtime

# Copy the built application and dependencies from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Change ownership of the /usr/src/app directory to the node user
RUN chown -R node:node /usr/src/app

# Expose the port that the application listens on
EXPOSE 3000

# Run the application as the 'node' user
USER node

# Run the application
CMD ["npm", "run", "dev"]