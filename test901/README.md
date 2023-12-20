# test901


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

### Useful Links
* Swagger UI: http://localhost:8080/swagger-ui.html
* Actuator Endpoint: http://localhost:8080/actuator
