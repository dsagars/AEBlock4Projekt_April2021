# RentFromFriend

## Development information:

- [Projects repositroy](https://github.com/dsagars/AEBlock4Projekt_April2021/tree/main/rentFromFriend)
- Frontend: SPA width: [Angular](https://angular.io/)
- Component Libary: [material.angular.io](https://material.angular.io/)
- NoSQL Backend: [Firebase/firestore](https://firebase.google.com/docs/firestore/)
- npm needs to be installed: [NPM](https://www.npmjs.com/)

## Starting Steps:

- clone Git repo
- run `npm install`
- open code in IDE of your choise (our recomendation: [vsCode](https://code.visualstudio.com/))
- Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Information for our Teacher:

Unser Projekt ist in verschiedene Module aufgeteilt die den realen Anwendungsfall der Applikation wiederspiegeln. Durch die einzelnen Module ist es uns trotz `Single Page Application` möglich code erst zu laden wenn er für die Darstellung benötigt wird. Die Module:

- `shared` wird für grundlegende importe genutzt die überall verwendet werden.
- `base` enthält die Grundfunktionalität der Applikation
- `login` wird nur für nicht angemeldete Nutzer:innen geladen
- `account` wird erst geladen wenn der Account Bereich geöffnet wird

- In `shared/models` kann unsere Datenstruktur anhand der Models betrachet werden
- Unter `shared/services` sind Services die in der ganzen Applikation aufgerufen werden können und verantwortlich für die Daten sind

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.
Contact: it9-mashea@student.itech-bs14.de, it9-eshtho@student.itech-bs14.de, ITa-Zi07@student.itech-bs14.de, it9-dahasa@student.itech-bs14.de, it9-gertma@student.itech-bs14.de
