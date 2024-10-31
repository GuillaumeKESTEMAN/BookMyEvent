Bienvenue sur la doc de BookMyEvent !

BookMyEvent est une application mobile de gestion d'évènements, permettant la consultation, création et l'inscription à divers évènements créés par les utilisateurs.

# Les Fonctionnalités
=====================

## Création de Compte

Les nouveaux utilisateurs doivent se créer un compte, en renseignant le nom d'utilisateur souhaité, une bio et un mot de passe.
Une fois cela fait, ils seront redirigés vers la page principale de l'application.

## Connexion à un compte existant

Un utilisateur disposant déjà d'un compte peut se connecter à son profil via un formulaire classique.

## Consultation et Inscription aux évènements

Sur la page principale, les utilisateurs pourront consulter l'ensemble des évènements disponibles, affichés sous forme d'une liste composée de cartes cliquables, chacune renvoyant vers une page dédiée à l'évènement désiré.

Sur la page de l'évènement en question, l'utilisateur pourra en consulter la description, ainsi que s'y inscrire ou s'en désinscrire.

## Création d'évènements

Depuis la page principale, un bouton informe les utilisateurs de la possibilité de créer leurs propres évènements, en cliquant sur celui-ci, ils sont envoyés vers un formulaire qui leur permet de renseigner les caractéristiques de l'event, et de le créer en validant les données.

## Récapitulatif des évènements utilisateurs

Une page User Events affiche l'ensemble des évènements créés et souscrits par l'utilisateur courant, sous forme de cartes cliquables redirigeant vers la page de l'event.

## Consultation et modification des données utilisateur

Une page Account permet à l'utilisateur d'accéder au récapitulatif de ses informations de compte et de les modifier.
Cet écran permet aussi, via divers boutons, de se déconnecter ou de supprimer son compte.

# La Navigation
===============

Les pages externes (Sign-In, Sign-Up) sont accessibles à tous les visiteurs non-connectés, et sont gérées via un stack navigator.
Les pages internes, accessibles aux utilisateurs connectés, sont gérées via un Tab Navigator, un Bottom Nav Bar permet de passer d'une page à l'autre.

# La Gestion des Données
========================

La gestion des données se fait inMemory à l'aide de l'AsyncStorage, toute la gestion des utilisateurs et des events passe par là, via des setItem et getItem.

L'utilisateur courant est stocké dans un Secure Store d'Expo afin de ne pas avoir beosin de se reconnecter à chaque ouverture de l'application.

# Le Style
==========

Utilisation de la librairie React Native Paper pour les composants et le style global.

Une [maquette Figma](https://www.figma.com/design/5G8pNkv3YDjO8b7jfnlITw/Untitled?node-id=2-33&node-type=canvas&t=qd9fxmkc5ZyihzcJ-0) a été faite au préalable pour définir le style de l'application.

# Architecture Fichiers
=======================

Architecture React classique, Screens pour les écrans de l'appli, Assets pour les ressources, Utils pour les fonctions utilitaires, Context pour le contexte global de l'appli, Components pour les composants réutilisables

# Packages Utilisés
===================

react
react native
react navigation
react native paper
react native uuid
expo

# Guide d'exécution local
=========================

Prérequis: Node.js
Utilisation: Lancer le projet via npm run start, possibilité d'utiliser Android Studio et son émulateur, ou Expo Go
[Voir Doc Expo](https://docs.expo.dev/get-started/set-up-your-environment/)


