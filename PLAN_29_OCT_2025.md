# 📅 PLAN POUR LE 29 OCTOBRE 2025

## 🎯 OBJECTIFS DE LA SESSION

### Priorité 1 : Media Service (4-5h estimées)
Créer le service de gestion des médias (images produits)

### Priorité 2 : Tests complémentaires (1h)
Tester les endpoints UPDATE et DELETE de Product Service

### Priorité 3 (si temps) : Début Angular (2-3h)
Initialiser le projet frontend

---

## 📋 CHECKLIST DÉTAILLÉE

### ✅ AVANT DE COMMENCER

```bash
# 1. Vérifier Docker
docker ps
# Doit montrer : mongodb, kafka, zookeeper (3 containers UP)

# 2. Relancer les services backend
cd E:\pZone01\Pjava\buy-01\backend\user-service
java -jar target\user-service-1.0.0.jar
# (nouveau terminal)
cd E:\pZone01\Pjava\buy-01\backend\product-service
java -jar target\product-service-1.0.0.jar

# 3. Vérifier dans Postman
GET http://localhost:8081/api/auth/health
GET http://localhost:8082/api/products
```

---

## 🎬 PHASE 1 : TESTS PRODUCT SERVICE (30 min)

### Test 1 : Créer 2-3 produits supplémentaires
**POST** `http://localhost:8082/api/products`  
**Authorization** : Bearer (token Alice SELLER)

Produits à créer :
```json
{
  "name": "MacBook Pro M3",
  "description": "Latest MacBook with M3 chip",
  "price": 2499.99,
  "category": "Electronics",
  "stock": 20
}
```

```json
{
  "name": "Nike Air Max",
  "description": "Comfortable running shoes",
  "price": 149.99,
  "category": "Fashion",
  "stock": 100
}
```

### Test 2 : Modifier un produit
**PUT** `http://localhost:8082/api/products/{id}`  
**Authorization** : Bearer (token Alice)

```json
{
  "name": "iPhone 15 Pro Max",
  "description": "Updated: iPhone 15 Pro with 1TB storage",
  "price": 1499.99,
  "category": "Electronics",
  "stock": 45
}
```

**Attendu** : 200 OK avec produit modifié

### Test 3 : Tenter de modifier le produit d'un autre SELLER
1. Créer un 2ème SELLER (Bob) dans User Service
2. Login Bob pour avoir son token
3. Tenter de modifier le produit d'Alice avec token Bob

**Attendu** : 403 Forbidden (ownership protégé)

### Test 4 : Supprimer un produit
**DELETE** `http://localhost:8082/api/products/{id}`  
**Authorization** : Bearer (token Alice propriétaire)

**Attendu** : 200 OK avec message "Product deleted successfully"

### Test 5 : Recherche et filtres
- **GET** `/api/products/search?keyword=iphone`
- **GET** `/api/products/category/Electronics`
- **GET** `/api/products/seller/my-products` (avec token Alice)

---

## 🎬 PHASE 2 : MEDIA SERVICE (4-5h)

### Étape 1 : Structure de base (30 min)

Créer la structure :
```
backend/media-service/
├── pom.xml
├── src/main/
│   ├── java/com/ecommerce/media/
│   │   ├── model/
│   │   │   └── Media.java
│   │   ├── repository/
│   │   │   └── MediaRepository.java
│   │   ├── dto/
│   │   │   ├── MediaResponse.java
│   │   │   └── ProductEventDto.java
│   │   ├── security/ (copier de Product Service)
│   │   │   ├── JwtUtil.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── SecurityConfig.java
│   │   ├── service/
│   │   │   ├── MediaService.java
│   │   │   └── KafkaConsumerService.java
│   │   ├── controller/
│   │   │   └── MediaController.java
│   │   └── MediaServiceApplication.java
│   └── resources/
│       └── application.yml
└── build.bat
```

### Étape 2 : Configuration (15 min)

**pom.xml** : Ajouter en plus des dépendances habituelles :
- spring-boot-starter-validation
- commons-io (pour file handling)

**application.yml** :
```yaml
server:
  port: 8083

spring:
  data:
    mongodb:
      host: localhost
      port: 27017
      database: ecommerce_media
      authentication-database: admin
      username: admin
      password: admin123
  
  kafka:
    consumer:
      bootstrap-servers: localhost:9092
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
  secret: MySecretKeyForJWTTokenGenerationMustBeAtLeast256BitsLongForHS256Algorithm

upload:
  directory: ./uploads/media
```

### Étape 3 : Modèle Media (15 min)

**Media.java** :
```java
@Document(collection = "media")
public class Media {
    @Id
    private String id;
    private String productId;
    private String filename;
    private String contentType;  // image/jpeg, image/png
    private long size;           // en bytes
    private String uploadedBy;   // sellerId
    private String url;          // chemin fichier ou URL
    private LocalDateTime uploadedAt;
}
```

### Étape 4 : Upload de fichiers (1h)

**MediaService.java** :
- Méthode `uploadMedia(MultipartFile file, String productId, String sellerId)`
- Validation : taille < 2MB, type image (jpg, png, webp)
- Sauvegarde physique dans `./uploads/media/{productId}/`
- Création entrée MongoDB

**MediaController.java** :
```java
POST /api/media/upload?productId=xxx
- Header: Authorization Bearer token (SELLER)
- Body: form-data avec key "file"
- Validation: SELLER doit être propriétaire du produit
```

### Étape 5 : Kafka Consumer (1h)

**KafkaConsumerService.java** :
```java
@KafkaListener(topics = "product-events", groupId = "media-service-group")
public void consumeProductEvent(ProductEvent event) {
    if (event.getEventType().equals("DELETED")) {
        // Supprimer tous les médias du produit
        mediaService.deleteAllByProductId(event.getProductId());
    }
}
```

### Étape 6 : APIs complémentaires (30 min)

```java
GET /api/media/product/{productId}  // Liste médias d'un produit (PUBLIC)
GET /api/media/{id}                 // Récupérer fichier (PUBLIC)
DELETE /api/media/{id}              // Supprimer média (SELLER owner)
```

### Étape 7 : Compilation et tests (1h)

1. Compiler avec Maven
2. Démarrer sur port 8083
3. Tester upload image avec Postman
4. Vérifier limitation 2MB
5. Vérifier ownership SELLER
6. Tester suppression média
7. Tester Kafka : supprimer un produit → médias supprimés auto

---

## 🎬 PHASE 3 (OPTIONNELLE) : ANGULAR INIT (2h)

Si temps restant après Media Service :

### Étape 1 : Créer projet (15 min)
```bash
cd E:\pZone01\Pjava\buy-01\frontend
ng new ecommerce-frontend
# Options :
# - Routing: Yes
# - Stylesheet: SCSS
```

### Étape 2 : Installer Angular Material (10 min)
```bash
cd ecommerce-frontend
ng add @angular/material
# Theme: Indigo/Pink
# Typography: Yes
# Animations: Yes
```

### Étape 3 : Structure modules (30 min)
```bash
ng generate module auth
ng generate module products
ng generate module seller

ng generate component auth/login
ng generate component auth/register
ng generate component products/product-list
ng generate component seller/dashboard
```

### Étape 4 : Services (30 min)
```bash
ng generate service services/auth
ng generate service services/product
ng generate service services/media
```

### Étape 5 : Configuration environnement (15 min)

**environment.ts** :
```typescript
export const environment = {
  production: false,
  apiUrls: {
    user: 'http://localhost:8081/api',
    product: 'http://localhost:8082/api',
    media: 'http://localhost:8083/api'
  }
};
```

---

## 📊 RÉSULTATS ATTENDUS FIN DE SESSION

### Si Media Service complet :
```
✅ User Service    (100%)
✅ Product Service (100%)
✅ Media Service   (100%)
⏳ Frontend        (0% ou 20% si initié)

Progression totale : 65-70%
```

### Tests validés :
- ✅ Upload image < 2MB
- ✅ Rejet fichier > 2MB
- ✅ Rejet non-image (PDF, etc.)
- ✅ Ownership SELLER vérifié
- ✅ Suppression média OK
- ✅ Kafka consumer fonctionne (produit supprimé = médias supprimés)

---

## 🐛 PROBLÈMES ANTICIPÉS

### Problème possible 1 : Upload fichier
**Erreur** : "Maximum upload size exceeded"
**Solution** : Vérifier `spring.servlet.multipart.max-file-size: 2MB` dans application.yml

### Problème possible 2 : Kafka consumer ne reçoit pas
**Erreur** : Événements product-events pas consommés
**Solution** :
1. Vérifier Kafka topic existe : `docker exec -it ecommerce-kafka kafka-topics --list --bootstrap-server localhost:9092`
2. Vérifier group-id unique
3. Redémarrer Media Service

### Problème possible 3 : Fichier non trouvé
**Erreur** : FileNotFoundException lors de GET /api/media/{id}
**Solution** : Créer dossier uploads avant : `mkdir -p ./uploads/media`

---

## 💾 SAUVEGARDES

### Après chaque phase majeure :
```bash
git add .
git commit -m "feat: Media Service complete avec upload + Kafka consumer"
git push origin main
```

### Points de sauvegarde recommandés :
1. Après structure Media Service créée
2. Après upload fichier fonctionnel
3. Après Kafka consumer opérationnel
4. Après tous tests Postman validés
5. Si Angular initié : après structure modules

---

## 📝 NOTES POUR COPILOT (demain)

### Context rapide :
- User Service (8081) et Product Service (8082) fonctionnels
- 2 utilisateurs : John (CLIENT), Alice (SELLER)
- 1+ produits créés (iPhone, MacBook, Nike)
- Docker MongoDB + Kafka opérationnels

### Si blocage :
- Consulter RECAP_28_OCT_2025.md pour détails techniques
- Voir COPILOT_PROGRESSION.md pour architecture globale
- Exemples de code dans user-service et product-service

### Tokens actuels (expireront dans 24h) :
- John CLIENT : Regénérer avec POST /api/auth/login
- Alice SELLER : Regénérer avec POST /api/auth/login

---

## ⏰ TIMING PRÉVISIONNEL

```
09h00 - 09h30  Setup + Tests Product Service
09h30 - 11h00  Media Service structure + config + modèle
11h00 - 12h00  Upload fichiers + validation
12h00 - 13h00  PAUSE DÉJEUNER
13h00 - 14h00  Kafka Consumer
14h00 - 15h00  APIs GET/DELETE + tests Postman
15h00 - 17h00  Angular init (si temps)
17h00 - 17h30  Git commit + mise à jour docs
```

**Durée totale estimée** : 6-7h de travail effectif

---

## 🎯 CRITÈRES DE SUCCÈS

### Must Have (obligatoire) :
- ✅ Media Service compilé et déployé sur 8083
- ✅ Upload image fonctionne avec limitation 2MB
- ✅ Ownership SELLER vérifié
- ✅ Kafka consumer supprime médias quand produit supprimé
- ✅ Tests Postman tous validés

### Nice to Have (bonus) :
- ✅ Angular projet initialisé
- ✅ Structure modules créée
- ✅ Services Angular générés
- ✅ Première page de login mockée

---

## 🔥 MOTIVATION

**Hier** : 31% de progression en 1 session  
**Aujourd'hui** : Objectif 25-30% supplémentaires  
**Total visé** : 65-70% du projet complet  

**Plus que 2-3 sessions pour finir le projet ! 💪**

---

**Let's go chef ! On va crusher demain ! 🚀🔥**
