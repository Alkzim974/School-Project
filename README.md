# 🛍️ E-Commerce Platform - Microservices Architecture

## 📌 Description du Projet

Plateforme e-commerce complète développée avec une architecture microservices utilisant **Spring Boot** pour le backend et **Angular** pour le frontend.

### 🎯 Objectif Principal
Créer une plateforme où :
- Les **clients** peuvent consulter et acheter des produits
- Les **vendeurs** peuvent gérer leurs produits et leurs images
- Communication entre services via **Kafka**
- Sécurité renforcée avec authentification JWT/OAuth2

---

## 🏗️ Architecture du Projet

### Microservices Backend (Spring Boot)
```
├── user-service          # Gestion des utilisateurs (clients & vendeurs)
├── product-service       # Gestion des produits (CRUD)
├── media-service         # Gestion des images produits
├── api-gateway           # Point d'entrée unique (optionnel)
└── eureka-server         # Service discovery (optionnel)
```

### Frontend (Angular)
```
└── ecommerce-frontend    # Application Angular
    ├── auth              # Authentification
    ├── seller-dashboard  # Dashboard vendeur
    ├── products          # Liste produits
    └── media             # Gestion médias
```

---

## 📊 Modèle de Données

### User (Utilisateur)
```
- id: String
- name: String
- email: String (unique)
- password: String (hashé)
- role: Enum (CLIENT / SELLER)
- avatar: String (URL)
```

### Product (Produit)
```
- id: String
- name: String
- description: String
- price: Double
- quantity: Int
- userId: String (référence au vendeur)
- mediaIds: List<String> (références aux images)
```

### Media (Image)
```
- id: String
- imagePath: String
- productId: String (référence au produit)
```

**Relations** :
- Un User (SELLER) peut avoir plusieurs Products (1 → n)
- Un Product peut avoir plusieurs Media (1 → n)

---

## 🔧 Technologies Utilisées

### Backend
- **Java 17+**
- **Spring Boot 3.x**
- **Spring Security** (JWT/OAuth2)
- **Spring Data MongoDB**
- **Apache Kafka** (communication inter-services)
- **MongoDB** (base de données)
- **Docker** & **Docker Compose**
- **Maven** (gestion dépendances)

### Frontend
- **Angular 16+**
- **TypeScript**
- **Angular Material** (UI)
- **RxJS** (gestion asynchrone)
- **HttpClient** (API calls)

### Sécurité
- **HTTPS** (Let's Encrypt)
- **BCrypt** (hash passwords)
- **JWT tokens**
- **CORS configuration**

---

## 🚀 Installation et Démarrage

### Prérequis
- Java 17 ou supérieur
- Node.js 18+ et npm
- Docker et Docker Compose
- MongoDB (via Docker)
- Kafka (via Docker)
- Maven

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd buy-01
```

2. **Démarrer avec Docker**
```bash
docker-compose up -d
```

3. **Backend - Chaque microservice**
```bash
cd user-service
mvn clean install
mvn spring-boot:run
```

4. **Frontend**
```bash
cd ecommerce-frontend
npm install
ng serve
```

5. **Accès**
- Frontend: http://localhost:4200
- API Gateway: http://localhost:8080
- User Service: http://localhost:8081
- Product Service: http://localhost:8082
- Media Service: http://localhost:8083

---

## 🔐 Sécurité

### Mesures de Sécurité Implémentées
✅ **HTTPS** - Chiffrement des données en transit  
✅ **Hash des mots de passe** - BCrypt avec salt  
✅ **JWT Authentication** - Tokens sécurisés  
✅ **Validation des entrées** - Protection contre injections  
✅ **Contrôle d'accès** - Role-based (CLIENT/SELLER)  
✅ **Limitation upload** - Max 2MB pour les images  
✅ **Validation fichiers** - Seulement images légitimes  
✅ **Protection données sensibles** - Jamais exposées dans les réponses  

---

## 📱 Fonctionnalités

### Pour tous les utilisateurs
- ✅ Inscription (client ou vendeur)
- ✅ Connexion / Déconnexion
- ✅ Voir la liste des produits

### Pour les clients (CLIENT)
- ✅ Consulter les produits
- ✅ Voir les détails des produits

### Pour les vendeurs (SELLER)
- ✅ Dashboard de gestion
- ✅ Créer des produits
- ✅ Modifier ses produits
- ✅ Supprimer ses produits
- ✅ Upload d'images (max 2MB)
- ✅ Gérer ses images
- ✅ Upload/Modifier avatar

---

## 🧪 Tests

### Backend
```bash
mvn test
```

### Frontend
```bash
ng test
```

### Tests à effectuer
- ✅ CRUD Users et Products
- ✅ Authentification par rôle
- ✅ Upload média (contraintes)
- ✅ Sécurité et validation
- ✅ Gestion d'erreurs

---

## 📚 Documentation API

### User Service (Port 8081)
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Modifier profil

### Product Service (Port 8082)
- `GET /api/products` - Liste produits
- `GET /api/products/{id}` - Détail produit
- `POST /api/products` - Créer produit (SELLER)
- `PUT /api/products/{id}` - Modifier produit (SELLER)
- `DELETE /api/products/{id}` - Supprimer produit (SELLER)

### Media Service (Port 8083)
- `POST /api/media/upload` - Upload image (max 2MB)
- `GET /api/media/{id}` - Récupérer image
- `DELETE /api/media/{id}` - Supprimer image (SELLER)

---

## 🐳 Docker

### Services Docker
- **MongoDB** - Base de données
- **Kafka** - Message broker
- **Zookeeper** - Kafka dependency
- **Backend services** - Microservices
- **Frontend** - Application Angular

---

## 👥 Équipe & Contribution

Développé dans le cadre d'un projet e-commerce microservices.

---

## 📄 Licence

Ce projet est à usage éducatif.

---

## 🔗 Ressources

- [Spring Boot Microservices Guide](https://spring.io/microservices)
- [Spring Cloud Eureka](https://spring.io/projects/spring-cloud-netflix)
- [Let's Encrypt](https://letsencrypt.org/)
- [Angular Documentation](https://angular.io/docs)
- [Apache Kafka](https://kafka.apache.org/)
