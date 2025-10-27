# 🤖 COPILOT PROGRESSION - Pour reprendre le projet sur Linux

**Date de dernière mise à jour** : 27 octobre 2025  
**Statut actuel** : User Service FONCTIONNEL ✅

---

## 📍 OÙ ON EN EST

### ✅ CE QUI EST TERMINÉ

#### 1. **Documentation complète**
- ✅ README.md (vue d'ensemble du projet)
- ✅ PLANNING.md (estimation 45h total)
- ✅ PROGRESSION.md (suivi détaillé)
- ✅ TOOLS.md (liste des outils installés)

#### 2. **Infrastructure Docker**
- ✅ docker-compose.yml créé
- ✅ MongoDB 7.0 (port 27017, credentials: admin/admin123)
- ✅ Kafka 7.5.0 (port 9092)
- ✅ Zookeeper (port 2181)
- ✅ Tous les containers testés et fonctionnels

#### 3. **User Service (Backend) - 100% COMPLET**
- ✅ Structure Maven Spring Boot 3.2.0
- ✅ Modèles : User, Role (CLIENT/SELLER)
- ✅ Repository MongoDB : UserRepository
- ✅ DTOs : RegisterRequest, LoginRequest, AuthResponse, UserResponse
- ✅ Sécurité : JwtUtil, JwtAuthenticationFilter, SecurityConfig
- ✅ Service : UserService (register, login, profile)
- ✅ Controllers : AuthController, UserController
- ✅ Application principale : UserServiceApplication
- ✅ **Compilation réussie** (JAR créé)
- ✅ **Service démarré** sur port 8081
- ✅ **MongoDB connecté**
- ✅ **Testé avec Postman** :
  - Health Check : `GET /api/auth/health` → OK ✅
  - Register : `POST /api/auth/register` → OK ✅
  - Login : `POST /api/auth/login` → OK ✅

#### 4. **Git Repository**
- ✅ Repository initialisé
- ✅ .gitignore configuré
- ✅ Premier commit effectué
- ✅ Prêt pour push vers remote

---

## 🐧 CONFIGURATION SUR L'AUTRE PC (LINUX)

### ✅ **Prérequis déjà installés (à vérifier)**
L'utilisateur a mentionné avoir déjà :
- ✅ Docker
- ✅ Java
- ✅ Maven
- ✅ Angular

### 🔧 **Vérifications à faire**

```bash
# Vérifier Java (doit être >= 17)
java -version

# Vérifier Maven
mvn -version

# Vérifier Docker
docker --version
docker-compose --version

# Vérifier Node.js et Angular (pour plus tard)
node -v
npm -v
ng version
```

---

## 🚀 ÉTAPES POUR DÉMARRER SUR LINUX

### **1. Cloner le repository**
```bash
cd ~/Projects  # ou ton dossier de projets
git clone <URL_DU_REPO>
cd buy-01
```

### **2. Lancer l'infrastructure Docker**
```bash
cd backend
docker-compose up -d

# Vérifier que tout tourne
docker ps
# Tu dois voir : mongodb, kafka, zookeeper avec status "Up"
```

### **3. Compiler le User Service**
```bash
cd user-service

# Sur Linux, utilise directement Maven
mvn clean package -DskipTests

# Le JAR sera créé dans : target/user-service-1.0.0.jar
```

### **4. Démarrer le User Service**
```bash
java -jar target/user-service-1.0.0.jar

# Le service démarre sur http://localhost:8081
# Tu verras : "Started UserServiceApplication in X seconds"
```

### **5. Tester avec Postman (ou curl)**

**Health Check :**
```bash
curl http://localhost:8081/api/auth/health
# Résultat : {"status":"User Service is running"}
```

**Register :**
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "role": "CLIENT"
  }'
# Résultat : {"message":"User registered successfully"}
```

**Login :**
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
# Résultat : Token JWT + infos utilisateur
```

---

## 📊 STRUCTURE DU PROJET

```
buy-01/
├── README.md                       # Documentation principale
├── PLANNING.md                     # Plan détaillé (45h)
├── PROGRESSION.md                  # Suivi des tâches
├── TOOLS.md                        # Liste des outils
├── COPILOT_PROGRESSION.md          # Ce fichier (guide Copilot)
└── backend/
    ├── docker-compose.yml          # MongoDB + Kafka
    └── user-service/               # ✅ COMPLET ET FONCTIONNEL
        ├── pom.xml                 # Dépendances Maven
        ├── src/
        │   └── main/
        │       ├── java/com/ecommerce/user/
        │       │   ├── model/
        │       │   │   ├── User.java
        │       │   │   └── Role.java
        │       │   ├── repository/
        │       │   │   └── UserRepository.java
        │       │   ├── dto/
        │       │   │   ├── RegisterRequest.java
        │       │   │   ├── LoginRequest.java
        │       │   │   ├── AuthResponse.java
        │       │   │   └── UserResponse.java
        │       │   ├── security/
        │       │   │   ├── JwtUtil.java
        │       │   │   ├── JwtAuthenticationFilter.java
        │       │   │   └── SecurityConfig.java
        │       │   ├── service/
        │       │   │   └── UserService.java
        │       │   ├── controller/
        │       │   │   ├── AuthController.java
        │       │   │   └── UserController.java
        │       │   └── UserServiceApplication.java
        │       └── resources/
        │           └── application.yml
        └── target/
            └── user-service-1.0.0.jar  # JAR compilé
```

---

## 🎯 PROCHAINES ÉTAPES (À FAIRE DEMAIN)

### **Phase 1 : Finaliser User Service (1-2h)**
1. ⏳ **Tester les endpoints protégés**
   - GET /api/users/profile (avec token JWT)
   - GET /api/users/{id} (récupérer un autre utilisateur)
   - PUT /api/users/profile (modifier son profil)

2. ⏳ **Tests de sécurité**
   - Vérifier qu'un CLIENT ne peut pas accéder aux données d'un autre
   - Vérifier que le token expire bien après 24h
   - Tester avec un token invalide/expiré

### **Phase 2 : Product Service (6-8h)**
1. Créer la structure Spring Boot
2. Model : Product (id, name, description, price, sellerId, category, stock)
3. Repository : ProductRepository (MongoDB)
4. Service : ProductService
   - CRUD complet (Create, Read, Update, Delete)
   - **Validation** : Seul le SELLER propriétaire peut modifier/supprimer
5. Controller : ProductController
   - POST /api/products (SELLER only)
   - GET /api/products (public)
   - GET /api/products/{id} (public)
   - PUT /api/products/{id} (SELLER only, owner)
   - DELETE /api/products/{id} (SELLER only, owner)
6. **Kafka Producer** : Envoyer un événement lors de création/modification de produit

### **Phase 3 : Media Service (4-5h)**
1. Créer la structure Spring Boot
2. Model : Media (id, productId, filename, url, uploadedBy)
3. Upload de fichiers :
   - Limitation 2MB
   - Formats acceptés : JPG, PNG, WEBP
   - Stockage local (ou cloud AWS S3 si besoin)
4. **Kafka Consumer** : Écouter les événements produits
5. Controller : MediaController
   - POST /api/media/upload (SELLER only)
   - GET /api/media/{productId} (public)
   - DELETE /api/media/{id} (SELLER only, owner)

### **Phase 4 : Frontend Angular (10-12h)**
1. Générer le projet : `ng new ecommerce-frontend`
2. Installer Angular Material
3. Services :
   - AuthService (login, register, getProfile)
   - ProductService (CRUD produits)
   - MediaService (upload images)
4. Components :
   - LoginComponent
   - RegisterComponent
   - ProductListComponent
   - ProductDetailComponent
   - SellerDashboardComponent (SELLER only)
   - MediaUploadComponent (SELLER only)
5. Guards :
   - AuthGuard (vérifier si connecté)
   - SellerGuard (vérifier rôle SELLER)
6. Interceptor JWT (ajouter token dans toutes les requêtes)

---

## 🔑 INFORMATIONS IMPORTANTES

### **Configuration MongoDB**
```
URL: mongodb://admin:admin123@localhost:27017/ecommerce_users?authSource=admin
Database: ecommerce_users
Collection: users (créée automatiquement)
```

### **Configuration Kafka**
```
Bootstrap servers: localhost:9092
Topics à créer : product-events, media-events
```

### **Ports utilisés**
```
8081 → User Service
8082 → Product Service (à créer)
8083 → Media Service (à créer)
4200 → Angular Frontend (à créer)
27017 → MongoDB
9092 → Kafka
2181 → Zookeeper
```

### **JWT Configuration**
```
Secret: MySecretKeyForJWTTokenGenerationMustBeAtLeast256BitsLongForHS256Algorithm
Expiration: 24 heures (86400000 ms)
```

---

## 🐛 PROBLÈMES RÉSOLUS

1. ❌ **Maven Daemon (mvnd) path error** → ✅ Utilisé Maven standard
2. ❌ **Lambda expression type error** → ✅ Remplacé par if-else
3. ❌ **Missing imports (Optional, User)** → ✅ Imports ajoutés
4. ❌ **Health check 403 Forbidden** → ✅ Ajouté `/api/auth/health` aux routes publiques

---

## 💬 POUR COPILOT (DEMAIN)

**Contexte rapide :**
- Projet e-commerce avec microservices (Spring Boot + Angular)
- User Service COMPLET et TESTÉ ✅
- Infrastructure Docker opérationnelle ✅
- Prochaine étape : Product Service

**Si besoin de contexte détaillé :**
- Lis PLANNING.md pour la vue d'ensemble
- Lis PROGRESSION.md pour le suivi technique
- Lis le code dans `backend/user-service/src/` pour comprendre la structure

**Questions fréquentes à anticiper :**
- "Comment tester avec le token JWT ?" → Utiliser Authorization: Bearer TOKEN
- "Comment créer un SELLER ?" → Même endpoint register, mais role: "SELLER"
- "MongoDB ne se connecte pas ?" → Vérifier docker ps et les credentials
- "Erreur port 8081 déjà utilisé ?" → Arrêter l'ancien process : `pkill -f user-service`

---

## ✅ CHECKLIST DE DÉMARRAGE (Linux)

```bash
# 1. Vérifier l'environnement
[ ] java -version  # >= 17
[ ] mvn -version
[ ] docker --version

# 2. Cloner et setup
[ ] git clone <repo>
[ ] cd buy-01/backend
[ ] docker-compose up -d
[ ] docker ps  # vérifier 3 containers

# 3. Build et run
[ ] cd user-service
[ ] mvn clean package -DskipTests
[ ] java -jar target/user-service-1.0.0.jar

# 4. Test rapide
[ ] curl http://localhost:8081/api/auth/health
# Si tu vois {"status":"User Service is running"} → ✅ TOUT EST OK !
```

---

**🎯 Objectif final :** Valider tous les critères d'audit pour le projet e-commerce complet (Backend + Frontend + Tests)

**📅 Estimation restante :** ~35h (Product: 8h, Media: 5h, Frontend: 12h, Tests/Intégration: 10h)

---

**Bon courage pour demain ! 🚀**
