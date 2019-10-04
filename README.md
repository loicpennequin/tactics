# TACTICS

This repository contains the source code for a multiplayer video game. This includes server-side code, the website to download the game client, and the client itself.
Thr project is divided in 5 packages:
* tactics-server: the server side code to serve the website and allow communication with the client through websockets and GraphQL
* tactics-app: the game client built with electron and react JS
* tactics-website: the website to sign up and download the game client. For no in simple HTML, but will probably a nextJS ap later on.
* tactics-game: the code for the business logic of the game mechanics themselves
* tactics-common: code shared between multiple packages. Mostly constants and helper functions.

## GETTING STARTED

-   clone repo
-   make sure MySQL is started
-   `npm run setup`
-   follow the command line to create your environnement file for the server
-   `npm run dev` will start the server and the electron app
-   `npm run start:server` will only start the server
-   `npm run start:client` will only start the electorn app (not really relevant since the server is needed)
-   `npm run build:app` will build and package the electron app, and build the installer
