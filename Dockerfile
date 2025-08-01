# ─── build stage ───────────────────────────────────────────────
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app

# copy just mvnw and deps declarations first for layer caching
COPY pom.xml mvnw ./
COPY .mvn .mvn/
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# copy all source & build
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# ─── runtime stage ─────────────────────────────────────────────
FROM eclipse-temurin:21-jre
WORKDIR /app

# pull in the built jar
COPY --from=build /app/target/*.jar app.jar

# allow Render (or other hosts) to override the port
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
