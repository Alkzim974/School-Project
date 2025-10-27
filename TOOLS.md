# 🛠️ OUTILS & PACKAGES NÉCESSAIRES

## 📦 INSTALLATIONS REQUISES

---

## 💻 OUTILS DE DÉVELOPPEMENT

### 1. Java Development Kit (JDK)
- **Version** : Java 17 ou supérieur
- **Téléchargement** : https://www.oracle.com/java/technologies/downloads/
- **Alternative** : OpenJDK (https://adoptium.net/)
- **Vérification** :
```bash
java -version
javac -version
```

### 2. Node.js & npm
- **Version** : Node.js 18.x ou supérieur
- **Téléchargement** : https://nodejs.org/
- **Vérification** :
```bash
node -v
npm -v
```

### 3. Docker Desktop
- **Version** : Dernière version stable
- **Windows** : https://www.docker.com/products/docker-desktop/
- **Inclut** : Docker + Docker Compose
- **Vérification** :
```bash
docker --version
docker-compose --version
```

### 4. Maven
- **Version** : 3.8.x ou supérieur
- **Téléchargement** : https://maven.apache.org/download.cgi
- **Note** : Souvent inclus avec les IDEs Java
- **Vérification** :
```bash
mvn -version
```

### 5. Git
- **Version** : Dernière version
- **Téléchargement** : https://git-scm.com/downloads
- **Vérification** :
```bash
git --version
```

---

## 🎨 IDEs & Éditeurs (Choisis un)

### Option 1 : IntelliJ IDEA (Recommandé pour Java)
- **Version** : Community (gratuit) ou Ultimate
- **Téléchargement** : https://www.jetbrains.com/idea/download/
- **Plugins recommandés** :
  - Spring Boot
  - Lombok
  - Docker
  - MongoDB

### Option 2 : Visual Studio Code
- **Téléchargement** : https://code.visualstudio.com/
- **Extensions recommandées** :
  - Java Extension Pack
  - Spring Boot Extension Pack
  - Angular Language Service
  - Docker
  - MongoDB for VS Code
  - REST Client

### Option 3 : Eclipse
- **Version** : Eclipse IDE for Enterprise Java
- **Téléchargement** : https://www.eclipse.org/downloads/

---

## 🧪 OUTILS DE TEST

### 1. Postman
- **Téléchargement** : https://www.postman.com/downloads/
- **Usage** : Tester les APIs REST
- **Alternative** : Insomnia, REST Client (VS Code)

### 2. MongoDB Compass (Optionnel)
- **Téléchargement** : https://www.mongodb.com/products/compass
- **Usage** : Interface graphique pour MongoDB

---

## 📚 DÉPENDANCES BACKEND (Spring Boot)

### Pour tous les microservices

#### pom.xml - Dépendances communes
```xml
<!-- Spring Boot Starter -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Data MongoDB -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>

<!-- Validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<!-- Lombok (optionnel mais recommandé) -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>

<!-- Spring Kafka -->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>

<!-- Spring Boot DevTools (dev seulement) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>

<!-- Testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-test</artifactId>
    <scope>test</scope>
</dependency>
```

### Dépendances spécifiques

#### User Service - Supplémentaires
```xml
<!-- Pour upload avatar -->
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.11.0</version>
</dependency>
```

#### Media Service - Supplémentaires
```xml
<!-- Pour manipulation images -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-imaging</artifactId>
    <version>1.0-alpha3</version>
</dependency>

<!-- File upload -->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.5</version>
</dependency>
```

#### Product Service - Supplémentaires
```xml
<!-- Kafka Producer -->
<!-- Déjà inclus dans spring-kafka -->
```

---

## 🎨 DÉPENDANCES FRONTEND (Angular)

### Installation Angular CLI
```bash
npm install -g @angular/cli@16
```

### Vérification
```bash
ng version
```

### Packages npm à installer dans le projet

#### package.json - Dépendances principales
```bash
# Créer le projet Angular
ng new ecommerce-frontend

# Naviguer dans le projet
cd ecommerce-frontend

# Angular Material
ng add @angular/material

# HTTP Client (déjà inclus)
# RxJS (déjà inclus)

# JWT Decode
npm install jwt-decode

# Gestion de formulaires (déjà inclus)
# FormsModule, ReactiveFormsModule
```

#### Packages optionnels mais utiles
```bash
# Notifications/Toasts
npm install ngx-toastr

# Icons
npm install @angular/material-icons

# File upload avec preview
npm install ng2-file-upload
```

---

## 🐳 DOCKER - Services nécessaires

### docker-compose.yml - Services à configurer

```yaml
version: '3.8'

services:
  # MongoDB
  mongodb:
    image: mongo:6.0
    container_name: ecommerce-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongodb_data:/data/db

  # Zookeeper (requis pour Kafka)
  zookeeper:
    image: confluentinc/cp-zookeeper:7.4.0
    container_name: ecommerce-zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  # Kafka
  kafka:
    image: confluentinc/cp-kafka:7.4.0
    container_name: ecommerce-kafka
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

volumes:
  mongodb_data:
```

---

## 🔧 CONFIGURATION PAR SERVICE

### User Service - application.yml
```yaml
server:
  port: 8081

spring:
  application:
    name: user-service
  data:
    mongodb:
      host: localhost
      port: 27017
      database: ecommerce_users
      authentication-database: admin
      username: admin
      password: password
  kafka:
    bootstrap-servers: localhost:9092

jwt:
  secret: your-secret-key-min-256-bits
  expiration: 86400000 # 24h en ms
```

### Product Service - application.yml
```yaml
server:
  port: 8082

spring:
  application:
    name: product-service
  data:
    mongodb:
      host: localhost
      port: 27017
      database: ecommerce_products
      authentication-database: admin
      username: admin
      password: password
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer

jwt:
  secret: your-secret-key-min-256-bits
```

### Media Service - application.yml
```yaml
server:
  port: 8083

spring:
  application:
    name: media-service
  data:
    mongodb:
      host: localhost
      port: 27017
      database: ecommerce_media
      authentication-database: admin
      username: admin
      password: password
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: media-service-group
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      properties:
        spring.json.trusted.packages: "*"
  servlet:
    multipart:
      max-file-size: 2MB
      max-request-size: 2MB

jwt:
  secret: your-secret-key-min-256-bits

media:
  upload-dir: ./uploads
```

---

## 🌐 ANGULAR - Configuration

### environment.ts (dev)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api', // ou URL de chaque service
  userServiceUrl: 'http://localhost:8081/api',
  productServiceUrl: 'http://localhost:8082/api',
  mediaServiceUrl: 'http://localhost:8083/api'
};
```

### environment.prod.ts (production)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-domain.com/api',
  // URLs HTTPS en production
};
```

---

## ✅ CHECKLIST D'INSTALLATION

### Avant de commencer le code :
- [ ] Java 17+ installé
- [ ] Node.js 18+ installé
- [ ] Docker Desktop installé et démarré
- [ ] Maven installé
- [ ] Git installé
- [ ] IDE configuré (IntelliJ ou VS Code)
- [ ] Postman installé
- [ ] Angular CLI installé globalement

### Test des installations :
```bash
# Java
java -version

# Node & npm
node -v
npm -v

# Docker
docker --version
docker-compose --version

# Maven
mvn -version

# Git
git --version

# Angular CLI
ng version
```

---

## 📚 RESSOURCES & DOCUMENTATION

### Spring Boot
- Documentation : https://spring.io/projects/spring-boot
- Spring Security : https://spring.io/projects/spring-security
- Spring Data MongoDB : https://spring.io/projects/spring-data-mongodb
- Spring Kafka : https://spring.io/projects/spring-kafka

### Angular
- Documentation : https://angular.io/docs
- Angular Material : https://material.angular.io/
- RxJS : https://rxjs.dev/

### Autres
- MongoDB : https://www.mongodb.com/docs/
- Kafka : https://kafka.apache.org/documentation/
- Docker : https://docs.docker.com/
- JWT : https://jwt.io/

---

## 🚀 ORDRE D'INSTALLATION RECOMMANDÉ

1. ✅ Java JDK 17
2. ✅ Node.js & npm
3. ✅ Docker Desktop
4. ✅ Git
5. ✅ IDE (IntelliJ ou VS Code)
6. ✅ Maven (si pas inclus dans IDE)
7. ✅ Angular CLI
8. ✅ Postman
9. ✅ MongoDB Compass (optionnel)

---

**Une fois tout installé, on est prêt à coder ! 🎯**
