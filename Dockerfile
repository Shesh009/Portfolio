# Use the official Nginx image from Docker Hub
FROM nginx:1.27.2-alpine-slim

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy all the files from the current directory to the Nginx HTML folder
COPY . .

# Expose port 80 to access the app
EXPOSE 80

# No need for CMD since the default Nginx command starts the server
