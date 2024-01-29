# Weather Dashboard ☀️⛅️⛈️

Team members: Thomas Sickinger, Lea Franz

## Project

This is a weather dashboard application built with Vue.js and TypeScript for the course Hypermedia UX Engineering.   
The weather data is from the [weather api](https://www.weatherapi.com/) API. An API key is added in the live deployment. For running it locally, it has to be added to your local project.

Live deployment: tbd

**Features and functionalities:**
- weather dashboard for multiple locations
- location search
- local storage: selected locations and temperature unit
- dynamic routing to a weather details page for each location
- responsive for desktop and mobile

CI/CD: tbd

## Project setup

```
npm install
```

Add the weather [API](https://www.weatherapi.com/) key to your .env file like this:
```
VUE_APP_WEATHER_API=
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
