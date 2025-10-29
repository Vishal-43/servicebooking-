# Use Ubuntu as base image
FROM ubuntu:20.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install Java 21
RUN apt-get update && apt-get install -y openjdk-21-jdk

# Install Node.js 18
RUN apt-get install -y curl && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# Install MySQL server
RUN apt-get install -y mysql-server

# Install supervisord
RUN apt-get install -y supervisor

# Install Maven (for building backend)
RUN apt-get install -y maven

# Set working directory
WORKDIR /app

# Copy backend source
COPY . /app

# Build frontend first
WORKDIR /app/setu-frontend
RUN npm install
RUN npm run build

# Copy frontend build to backend static resources
RUN cp -r build/* /app/src/main/resources/static/

# Go back and build backend
WORKDIR /app
RUN mvn clean package -DskipTests

# Create MySQL data directory
RUN mkdir -p /var/lib/mysql-data /var/run/mysqld

# Initialize MySQL data directory
RUN mysqld --initialize-insecure --user=mysql --datadir=/var/lib/mysql-data

# Set permissions
RUN chown -R mysql:mysql /var/lib/mysql-data /var/run/mysqld

# Expose port
EXPOSE 8080

# Copy supervisord config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy init script
COPY init-db.sh /app/init-db.sh
RUN chmod +x /app/init-db.sh

# Start supervisord
CMD ["/usr/bin/supervisord"]