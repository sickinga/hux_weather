import { http, HttpHandler, HttpResponse } from "msw";
import { citySearchResponse } from "./city-search.mocks";

const getMapBoxHandler = http.get("https://api.mapbox.com/geocoding/v5/mapbox.places/**", () => {
    return HttpResponse.json(citySearchResponse);
});

export const handlers: HttpHandler[] = [getMapBoxHandler];
