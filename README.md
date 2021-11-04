# World Countries App

This is a sample angular 12 world countries directory application built with responsive css flexbox design without any external css libraries. It effectively uses RXJS BehaviourSubject and ngClass directive to manage UI state and switch between dark mode and light mode. It integrates with the [REST Countries V2 API](https://restcountries.com/#api-endpoints-v2) to pull countries data and display it. It has example unit tests that successfully test for the presence of the right text contents in the DOM, test for the functionality of input elements like text inputs in search box, and select input in the filter dropdown.

It's features include the ability of users to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

## Link to Live Demo:

[World Countries App](https://world-countries-app.herokuapp.com/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests. This will spin up a browser window.
