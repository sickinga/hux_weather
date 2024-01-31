# Weather Dashboard ☀️⛅️⛈️

Team members: Thomas Sickinger, Lea Franz

## Project

This is a weather dashboard application built with Vue.js and TypeScript for the course Hypermedia UX Engineering.   

The weather data is from the [weather api](https://www.weatherapi.com/) API. The geo data is from [mapbox](https://docs.mapbox.com/api/search/geocoding/). The API keys are added in the live deployment. For running it locally, they have to be added to your local project.

Live deployment: [hux-weather.web.app](https://hux-weather.web.app)

**Features and functionalities:**    
Cities can be saved via the bookmark button in the search results and if a search result is clicked the detail page is opened.
Saved cities can be removed from the dashboard via the delete bookmark button while hovering over the weather card.


- weather dashboard for multiple locations
- location search
- current location with useGeoLocation
- add and remove locations with pinia state management
- local storage: selected locations and temperature unit
- dynamic routing to a weather details page for each location
- responsive for desktop and mobile
- unit tests with jest
- three github actions: Test on PR, Build and Deploy on PR, Build and Deploy on push to master

CI/CD: tbd

## Project setup

```
npm install
```

Add the [weather API](https://www.weatherapi.com/) and [mapbox token](https://docs.mapbox.com/api/search/geocoding/) key to your .env file like this (like .env.example):
```
VUE_APP_WEATHER_API=
VUE_APP_MAPBOX_TOKEN=
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
