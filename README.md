# generator-springboot
The Yeoman generator for generating Spring Boot microservices for TTN.

## Prerequisites
* Node 14.*
* JDK 17+

## Installation
```shell
$ npm install -g yo@4.3.1
$ npm install -g generator-ez-gen 
```

## How to use?
Run the following command and answer the questions:

```shell
$ yo ez-gen
```

## Features
The generator-springboot generates a Spring Boot application with the following features configured:

* Spring Boot project with Maven and Gradle support
* Spring Data JPA integration with an option to select databases like MySQL, Postgresql.
* CORS configuration
* Swagger UI Integration
* SpringBoot Actuator configuration
* DockerCompose configuration for application
* Dockerfile
* Jenkinsfile
* SonarQube and JaCoCo based static analysis tools configuration
* Code formatting using Spotless and google-java-format 
* JUnit 5

### Generate a SpringBoot Microservice
After installing the `generator-ez-gen`, you can generate a new Spring Boot application as follows:

```shell
$ yo ez-gen
Generating SpringBoot Application
? What is the application name? demo
? What is the default package name? com.ttn.demo
? Which type of database you want to use? Postgresql
? Which build tool do you want to use? Gradle
```

### Generate REST API with CRUD operations
You can generate REST API with CRUD operation using the following command:

**IMPORTANT:** You should run the following command from within the generated project folder. 

```shell
$ cd demo
$ yo ez-gen:controller Customer --base-path /api/customers
```

This sub-generator will generate the following:

* JPA entity
* Spring Data JPA Repository
* Service
* Spring MVC REST Controller with CRUD operations
* Unit and Integration Tests for REST Controller

```shell
$ yo ez-gen:controller Customer --base-path /api/customers
```

## Local Development Setup

```shell
$ git clone https://github.com/dheerajkumarmadaan/ez-gen-generator
$ cd ez-gen-generator
$ npm install -g yo@4.3.1
$ npm install 
$ npm link
$ yo ez-gen
```

## Releasing a new version
Before publishing a new release, make sure to update the version number in `package.json` updated.

```shell
$ npm login
$ npm publish
```
