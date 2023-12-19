# <%= appName %>

<%_ if (buildTool === 'maven') { _%>
### Format code

```shell
$ ./mvnw spotless:apply
```

### Run tests

```shell
$ ./mvnw clean verify
```

### Run locally

```shell
$ docker-compose -f docker/docker-compose.yml up -d
$ ./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```
<%_ } _%>

<%_ if (buildTool === 'gradle') { _%>
### Format code

```shell
$ ./gradlew spotlessApply
```

### Run tests

```shell
$ ./gradlew clean build
```

### Run locally

```shell
$ docker-compose -f docker/docker-compose.yml up -d
$ ./gradlew bootRun -Plocal
```
<%_ } _%>

### Useful Links
* Swagger UI: http://localhost:8080/swagger-ui.html
* Actuator Endpoint: http://localhost:8080/actuator
