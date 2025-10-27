# 📅 PLANNING DU PROJET E-COMMERCE

## 🎯 Objectif
Créer une plateforme e-commerce complète avec microservices en suivant l'audit à 100%

---

## 📊 PHASES DU PROJET

### ⏱️ Estimation totale : ~40-50 heures

---

## 🔷 PHASE 1 : SETUP INITIAL (4-6h)

### 1.1 Configuration de l'environnement ⏱️ 2h
- [ ] Installer Java 17 JDK
- [ ] Installer Node.js et npm
- [ ] Installer Docker Desktop
- [ ] Installer MongoDB Compass (optionnel)
- [ ] Installer Postman
- [ ] Installer IDE (IntelliJ IDEA / VS Code)
- [ ] Vérifier toutes les installations

### 1.2 Structure du projet ⏱️ 1h
- [ ] Créer la structure des dossiers
- [ ] Initialiser Git
- [ ] Créer .gitignore
- [ ] Créer docker-compose.yml

### 1.3 Configuration Docker ⏱️ 2h
- [ ] Configuration MongoDB
- [ ] Configuration Kafka + Zookeeper
- [ ] Configuration réseau Docker
- [ ] Test de démarrage des conteneurs

---

## 🔷 PHASE 2 : BACKEND - USER SERVICE (6-8h)

### 2.1 Initialisation User Service ⏱️ 1h
- [ ] Créer projet Spring Boot (Maven)
- [ ] Configurer application.properties/yml
- [ ] Configurer MongoDB connection
- [ ] Ajouter les dépendances nécessaires

### 2.2 Modèle User ⏱️ 1h
- [ ] Créer entité User
- [ ] Ajouter les annotations MongoDB
- [ ] Créer enum Role (CLIENT/SELLER)
- [ ] Créer UserRepository

### 2.3 Sécurité & Authentication ⏱️ 3h
- [ ] Configurer Spring Security
- [ ] Implémenter JWT (génération & validation)
- [ ] Créer JwtAuthenticationFilter
- [ ] Hash des mots de passe (BCrypt)
- [ ] Configuration CORS

### 2.4 API User ⏱️ 2h
- [ ] POST /api/auth/register (inscription)
- [ ] POST /api/auth/login (connexion)
- [ ] GET /api/users/profile (profil)
- [ ] PUT /api/users/profile (modifier profil)
- [ ] Upload avatar (multipart)

### 2.5 Tests User Service ⏱️ 1h
- [ ] Tests unitaires (Service layer)
- [ ] Tests d'intégration (API)
- [ ] Test avec Postman

---

## 🔷 PHASE 3 : BACKEND - PRODUCT SERVICE (5-6h)

### 3.1 Initialisation Product Service ⏱️ 1h
- [ ] Créer projet Spring Boot
- [ ] Configuration MongoDB
- [ ] Configuration Kafka producer
- [ ] Dépendances nécessaires

### 3.2 Modèle Product ⏱️ 1h
- [ ] Créer entité Product
- [ ] Annotations MongoDB
- [ ] Relation avec User (userId)
- [ ] ProductRepository

### 3.3 API Product (CRUD) ⏱️ 2h
- [ ] GET /api/products (liste tous les produits)
- [ ] GET /api/products/{id} (détail)
- [ ] POST /api/products (créer - SELLER only)
- [ ] PUT /api/products/{id} (modifier - SELLER only)
- [ ] DELETE /api/products/{id} (supprimer - SELLER only)

### 3.4 Sécurité Product ⏱️ 1h
- [ ] Vérification JWT
- [ ] Vérification rôle SELLER
- [ ] Vérification ownership (seller = créateur)

### 3.5 Communication Kafka ⏱️ 1h
- [ ] Producer Kafka (events produits)
- [ ] Configuration topics
- [ ] Test de communication

### 3.6 Tests Product Service ⏱️ 1h
- [ ] Tests CRUD
- [ ] Tests sécurité par rôle
- [ ] Test Postman

---

## 🔷 PHASE 4 : BACKEND - MEDIA SERVICE (4-5h)

### 4.1 Initialisation Media Service ⏱️ 1h
- [ ] Créer projet Spring Boot
- [ ] Configuration MongoDB
- [ ] Configuration Kafka consumer
- [ ] Dépendances (multipart, file handling)

### 4.2 Modèle Media ⏱️ 1h
- [ ] Créer entité Media
- [ ] Stockage des images (local ou cloud)
- [ ] MediaRepository

### 4.3 API Media ⏱️ 2h
- [ ] POST /api/media/upload (upload image)
- [ ] Validation fichier (type, taille max 2MB)
- [ ] GET /api/media/{id} (récupérer image)
- [ ] DELETE /api/media/{id} (supprimer - SELLER only)
- [ ] Association avec Product

### 4.4 Validation & Sécurité ⏱️ 1h
- [ ] Vérifier type fichier (images seulement)
- [ ] Limiter taille à 2MB
- [ ] Vérification ownership
- [ ] Gestion d'erreurs

### 4.5 Tests Media Service ⏱️ 1h
- [ ] Test upload valide
- [ ] Test dépassement taille
- [ ] Test mauvais format
- [ ] Test Postman

---

## 🔷 PHASE 5 : FRONTEND ANGULAR (10-12h)

### 5.1 Initialisation Angular ⏱️ 1h
- [ ] Créer projet Angular
- [ ] Installer Angular Material
- [ ] Structure des modules
- [ ] Configuration routing

### 5.2 Services Angular ⏱️ 2h
- [ ] AuthService (login, register, logout)
- [ ] UserService (profil)
- [ ] ProductService (CRUD)
- [ ] MediaService (upload)
- [ ] Interceptor JWT

### 5.3 Pages Authentication ⏱️ 2h
- [ ] Page Sign Up (client ou seller)
- [ ] Page Sign In
- [ ] Upload avatar (seller)
- [ ] Validation formulaires

### 5.4 Page Liste Produits ⏱️ 2h
- [ ] Component liste produits
- [ ] Affichage cards produits
- [ ] Affichage images
- [ ] Routing vers détails

### 5.5 Dashboard Vendeur ⏱️ 3h
- [ ] Component dashboard seller
- [ ] Liste des produits du vendeur
- [ ] Formulaire création produit
- [ ] Formulaire modification produit
- [ ] Suppression produit
- [ ] Guard (accès SELLER only)

### 5.6 Gestion Médias ⏱️ 2h
- [ ] Component upload images
- [ ] Preview images
- [ ] Validation (taille, type)
- [ ] Association avec produit
- [ ] Suppression image

### 5.7 UI/UX ⏱️ 1h
- [ ] Design responsive
- [ ] Messages d'erreur
- [ ] Messages de succès
- [ ] Loading states

---

## 🔷 PHASE 6 : INTÉGRATION & SÉCURITÉ (4-5h)

### 6.1 Communication Microservices ⏱️ 2h
- [ ] Tester communication Kafka
- [ ] Gestion des events
- [ ] Synchronisation données

### 6.2 HTTPS Configuration ⏱️ 2h
- [ ] Configuration SSL/TLS
- [ ] Let's Encrypt (optionnel en dev)
- [ ] HTTPS sur tous les services
- [ ] Frontend → Backend HTTPS

### 6.3 Validation finale sécurité ⏱️ 1h
- [ ] Vérifier hash passwords
- [ ] Vérifier JWT
- [ ] Vérifier contrôles d'accès
- [ ] Vérifier validation entrées

---

## 🔷 PHASE 7 : TESTS & VALIDATION AUDIT (6-8h)

### 7.1 Tests Backend ⏱️ 2h
- [ ] Tests unitaires tous les services
- [ ] Tests d'intégration
- [ ] Coverage > 70%

### 7.2 Tests Frontend ⏱️ 2h
- [ ] Tests unitaires composants
- [ ] Tests services
- [ ] Tests end-to-end (e2e)

### 7.3 Tests Manuel (Audit) ⏱️ 3h
- [ ] ✅ Docker setup et démarrage
- [ ] ✅ CRUD Users (client & seller)
- [ ] ✅ CRUD Products
- [ ] ✅ Authentication par rôle
- [ ] ✅ Upload média (contraintes)
- [ ] ✅ Frontend toutes les pages
- [ ] ✅ Sécurité (hash, HTTPS, validation)
- [ ] ✅ Qualité code (annotations Spring)
- [ ] ✅ Code Angular bien structuré
- [ ] ✅ Gestion d'erreurs

### 7.4 Tests Edge Cases ⏱️ 1h
- [ ] Email déjà existant
- [ ] Format image invalide
- [ ] Dépassement 2MB
- [ ] Client essaie de créer produit
- [ ] Seller modifie produit d'un autre

---

## 🔷 PHASE 8 : DOCKER & DÉPLOIEMENT (3-4h)

### 8.1 Dockerisation ⏱️ 2h
- [ ] Dockerfile pour chaque service
- [ ] Docker Compose complet
- [ ] Configuration network
- [ ] Volumes pour données persistantes

### 8.2 Documentation ⏱️ 1h
- [ ] README complet
- [ ] Documentation API (Swagger optionnel)
- [ ] Guide d'installation
- [ ] Guide utilisateur

### 8.3 Déploiement (optionnel) ⏱️ 1h
- [ ] Configuration serveur
- [ ] CI/CD (optionnel)
- [ ] Monitoring (optionnel)

---

## 🔷 PHASE 9 : FINALISATION (2-3h)

### 9.1 Revue Code ⏱️ 1h
- [ ] Clean code
- [ ] Commentaires
- [ ] Suppression code inutile
- [ ] Formatage

### 9.2 Tests finaux ⏱️ 1h
- [ ] Test complet du workflow
- [ ] Vérification audit (tous les points)
- [ ] Fix bugs restants

### 9.3 Présentation ⏱️ 1h
- [ ] Préparer démo
- [ ] Screenshots
- [ ] Vidéo de démo (optionnel)

---

## 📈 ORDRE DE DÉVELOPPEMENT RECOMMANDÉ

```
1. Setup Docker (MongoDB + Kafka)
   ↓
2. User Service (authentification d'abord)
   ↓
3. Product Service (dépend de User)
   ↓
4. Media Service (dépend de Product)
   ↓
5. Frontend Angular (après backend fonctionnel)
   ↓
6. Tests & Intégration
   ↓
7. Docker Compose final
   ↓
8. Validation Audit
```

---

## 🎯 CRITÈRES DE SUCCÈS (AUDIT)

### ✅ Points de validation obligatoires
1. ✅ Application démarre avec Docker
2. ✅ CRUD Users fonctionnel
3. ✅ CRUD Products fonctionnel
4. ✅ Authentification par rôle (CLIENT/SELLER)
5. ✅ Upload média avec contraintes (2MB, images only)
6. ✅ Frontend complet et intuitif
7. ✅ Sécurité (HTTPS, hash, validation)
8. ✅ Qualité code (annotations Spring correctes)
9. ✅ Code Angular structuré
10. ✅ Gestion d'erreurs complète

---

## 📝 NOTES IMPORTANTES

### À faire AVANT de commencer chaque phase :
1. 📖 Lire et comprendre les exigences
2. ✅ Vérifier les prérequis
3. 🎯 Définir les critères de succès
4. 📝 Préparer les tests

### À faire APRÈS chaque phase :
1. ✅ Tester manuellement
2. 📝 Mettre à jour PROGRESSION.md
3. 🐛 Corriger les bugs
4. 📋 Valider les points de l'audit concernés

---

## 🚦 DÉPENDANCES ENTRE PHASES

- **Product Service** dépend de **User Service** (JWT validation)
- **Media Service** dépend de **Product Service** (association)
- **Frontend** dépend de **tous les services backend**
- **Tests finaux** dépendent de **tout**

---

## ⚠️ RISQUES & POINTS D'ATTENTION

1. **Kafka** : Configuration peut être complexe → tester tôt
2. **JWT** : Bien implémenter la validation entre services
3. **Upload fichiers** : Validation stricte (2MB, images only)
4. **Ownership** : Seller ne peut modifier que SES produits
5. **HTTPS** : Configuration SSL peut prendre du temps
6. **Docker** : Bien gérer les volumes et networks

---

**Prêt à commencer chef ! 🚀**
