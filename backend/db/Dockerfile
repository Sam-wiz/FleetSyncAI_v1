# We will use the MySQL image from Docker Hub
FROM mysql:8.0

# Copy the initial SQL file to the container
COPY init.sql /docker-entrypoint-initdb.d/
COPY seed.sql /docker-entrypoint-initdb.d/
