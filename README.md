# Metrolympiades

**Metrolympiades** est une application destinée à faciliter l'organisation et la gestion des activités de team building sportives en entreprise. Elle permet aux chefs d'équipe d'enregistrer les matchs, de suivre les scores et de consulter un classement en temps réel, tout en remplaçant les méthodes manuelles traditionnelles comme les tableaux Excel.

---

## Sommaire

1. [Description du projet](#description-du-projet)
2. [Prérequis](#prérequis)
3. [Installation du projet](#installation-du-projet)
   - [Cloner l'API](#cloner-lapi)
   - [Démarrer le serveur de développement](#démarrer-le-serveur-de-développement)
4. [Fonctionnalités principales](#fonctionnalités-principales)
5. [Fonctionnalités détaillées](#fonctionnalités-détaillées)
6. [Technologies utilisées](#technologies-utilisées)
7. [Contributeurs](#contributeurs)

---

## Description du projet

**Metrolympiades** est une application destinée à la gestion des événements de team building sportif en entreprise. Le projet permet aux chefs d'équipe de gérer les matchs, les scores et les classements d'une manière plus moderne et efficace que les méthodes traditionnelles (tableaux Excel et papier).

## Prérequis

Avant de commencer, assurez-vous que vous avez installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
- [Prisma](https://www.prisma.io/) pour la gestion de la base de données

## Installation du projet

### Cloner l'API

1. Clonez l'API du projet **Metrolympiades** disponible à l'adresse suivante :

```sh
git clone https://github.com/ClementCatel/metrolympiades-api
```
2. Installez les dépendances nécessaires pour l'API :  

```sh
cd metrolympiades-api
npm install
```
3. Appliquez les migrations de la base de données :

```sh
npx prisma migrate dev --name init
```

4. Générez les fichiers Prisma :

```sh
npx prisma generate
```

5. Démarrez le serveur de l'API : 

```sh
npm run dev
```

### Démarrer l'application front-end

Pour démarrer l'application front-end en mode développement avec hot-reloading, suivez les étapes ci-dessous :

1. Clonez le repository du front-end :

```sh
git clone https://github.com/votre-nom-utilisateur/metrolympiades.git
```
2. Accédez au répertoire du projet front-end :

```sh
cd metrolympiades
```

3. Installez les dépendances requises pour le front-end :

```sh
npm install
```

4. Démarrez le serveur front-end en mode développement :  
```sh
npm run dev
```

Le serveur sera maintenant en cours d'exécution, et vous pourrez accéder à l'application dans votre navigateur à l'adresse suivante : [http://localhost:3000](http://localhost:3000).

### Ajouter des données aléatoires (optionnel)

Si vous souhaitez ajouter des données aléatoires pour tester l'application, vous pouvez exécuter la commande suivante après avoir installé l'API et démarré le serveur :

```sh
npm run seed
```

## Fonctionnalités principales

- **Gestion des comptes utilisateurs** : Les chefs d'équipe peuvent créer un compte, se connecter et se déconnecter.
- **Gestion des équipes** : Les chefs d'équipe peuvent gérer les membres de leur équipe (ajouter, supprimer) et modifier le nom de leur équipe.
- **Gestion des matchs et des scores** : Les chefs d'équipe peuvent créer des matchs, enregistrer les scores et indiquer l'épreuve associée.
- **Classement général** : Les utilisateurs, qu'ils soient authentifiés ou non, peuvent consulter le classement des équipes en fonction des points obtenus.

## Fonctionnalités détaillées

### 1. Inscription et gestion des comptes utilisateurs

- **Créer un compte** : Un chef d'équipe peut créer un compte en fournissant les informations nécessaires, telles que son nom et son email. Il pourra ensuite se connecter à l'application pour gérer son équipe.
- **Se connecter et se déconnecter** : Un chef d'équipe peut se connecter à son compte en utilisant ses identifiants, et il peut aussi se déconnecter à tout moment.

### 2. Gestion de l’équipe

- **Modifier le nom de l’équipe** : Le chef d'équipe peut changer le nom de son équipe à tout moment. Cela peut être utile pour personnaliser ou mettre à jour les informations de l'équipe.
- **Ajouter un membre d’équipe** : Le chef d'équipe peut ajouter des membres à son équipe en fournissant leur prénom et leur email.
- **Retirer un membre d’équipe** : Le chef d'équipe peut retirer un membre de son équipe si nécessaire, par exemple en cas de changement de participants.

### 3. Gestion des matchs et des scores

- **Créer un match** : Le chef d'équipe peut créer un match en précisant :
  - **L’heure de la rencontre** : Date et heure auxquelles le match doit avoir lieu.
  - **L’équipe adverse** : Le nom de l’équipe adverse avec laquelle son équipe va jouer.
  - **Les scores de chaque équipe** : Enregistrer le score des deux équipes à la fin du match.
  - **L’épreuve** : Indiquer l’activité sportive ou l’épreuve en cours (par exemple, football, course, etc.).

- **Visualiser ses matchs** : Le chef d'équipe peut consulter tous ses matchs, ainsi que les scores et l'épreuve associés, pour suivre l’évolution des performances de son équipe.

### 4. Classement général

- **Accès public au classement** : Le classement est accessible à tous, même aux utilisateurs non authentifiés. Cela permet à tous les participants et spectateurs de suivre les performances des équipes tout au long de la journée.
- **Visualiser les rangs des équipes** : Les utilisateurs peuvent voir les positions des équipes dans le classement.
- **Visualiser les points des équipes** : Le classement affiche les points de chaque équipe, calculés selon les règles suivantes :
  - 3 points pour une victoire
  - 1 point pour un match nul
  - 0 point pour une défaite

## Technologies utilisées

- **Vue 3** : Framework JavaScript pour construire l'interface utilisateur.
- **Vite** : Outil de build et de développement rapide pour Vue.js.
- **Vue Router** : Pour la gestion des routes et des pages dans l'application.
- **Vuex** : Pour la gestion d'état centralisée, notamment pour les informations des utilisateurs et des matchs.
- **Prisma** : Outil de gestion de la base de données, utilisé pour l'API.
- **ESLint** : Outil pour analyser et garantir la qualité du code.

## Contributeurs

Le projet a été réalisé par des étudiants de seconde année de BUT informatique à l'IUT Grand Ouest Normandie, site de Ifs. 

### Contributeurs principaux :

- **Caillet Enzo** : [enzolerigolo14](https://github.com/enzolerigolo14)
- **Duroy Cyprien** : [6pri2](https://github.com/6pri2)
- **Guernine Lyes** : [lyesg46](https://github.com/lyesg46)
- **Le Roy Alexandre** : [z0ralex](https://github.com/z0ralex)

### Encadrant professeur :

- **Mr Catel Clément** : [ClementCatel](https://github.com/ClementCatel)
