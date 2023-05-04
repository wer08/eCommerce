# Use a base image with Java 17 installed
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app


# Copy the packaged JAR file to the container
COPY target/backend-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port that the application will listen on
EXPOSE 8090

# Set the command to run the application when the container starts
CMD ["java", "-jar", "app.jar"]
