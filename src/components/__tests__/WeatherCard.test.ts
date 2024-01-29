import { shallowMount } from "@vue/test-utils";
import { UseQueryReturnType } from "@tanstack/vue-query";

import WeatherCard from "@/components/weather-card/WeatherCard.vue";
import * as hooks from "@/components/weather-card/weather-card.hook";
import type { AllWeatherData } from "@/types";
import ForecastListItemVue from "@/components/ForecastListItem.vue";
import { weatherApiResponse } from "@/mocks/weather-data.mocks";
import { setupGlobalTestEnv } from "@/mocks/test-setup";

describe("WeatherCard", () => {
    const lat = "52.5200";
    const lng = "13.4050";
    const locationName = "Berlin";
    const tempUnit = "°C";
    const setupEnv = setupGlobalTestEnv();

    it("renders the location name", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ isPending: true } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );
        const wrapper = shallowMount(WeatherCard, {
            setupEnv,
            props: { lat, lng, locationName, tempUnit },
        });

        expect(wrapper.find("h2").text()).toBe(locationName);
    });

    it("renders a spinner when data is loading", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ isPending: true } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );

        const wrapper = shallowMount(WeatherCard, {
            props: { lat, lng, locationName, tempUnit },
            setupEnv,
        });

        const spinner = wrapper.find(".spinner");
        expect(spinner.exists()).toBe(true);
    });

    it("renders an error message when data fetching fails", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ isError: true } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );
        const wrapper = shallowMount(WeatherCard, {
            props: { lat, lng, locationName, tempUnit },
            setupEnv,
        });
        const errorMessage = wrapper.find(".error-message");
        expect(errorMessage.text()).toBe("Error fetching data");
    });

    it("renders the current weather data", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ data: weatherApiResponse } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );
        const wrapper = shallowMount(WeatherCard, {
            props: { lat, lng, locationName, tempUnit },
            setupEnv,
        });

        const currentTemp = wrapper.find(".current-temp");
        expect(currentTemp.text()).toBe("1.2 °C");

        const feelsLikeTemp = wrapper.find(".feels-like-temp");
        expect(feelsLikeTemp.text()).toBe("Feels like: -2.2 °C");

        const condition = wrapper.find(".condition");
        expect(condition.text()).toBe("Sunny");

        expect(wrapper.html()).toContain(
            '<img class="current-icon" src="sun.png" alt="Sunny">'
        );

        const updatedText = wrapper.find(".updated-text");
        expect(updatedText.text()).toBe("Last updated at: 2021-01-23 12:00");
        const detailsText = wrapper.find(".nav-text");
        expect(detailsText.text()).toBe("Go to details >");
    });

    it("renders the forecast weather items data", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ data: weatherApiResponse } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );
        const wrapper = shallowMount(WeatherCard, {
            props: { lat, lng, locationName, tempUnit },
            setupEnv,
        });

        const forecastList = wrapper.find(".forecast-list");
        expect(forecastList.exists()).toBe(true);

        const items = wrapper.findAllComponents(ForecastListItemVue);
        expect(items.length).toBe(3);

        expect(items[0].props("data")).toEqual(
            weatherApiResponse.value.forecast.forecastday[0]
        );
        expect(items[0].props("tempUnit")).toBe("°C");
        expect(items[0].props("tempUnitPostfix")).toBe("_c");

        expect(items[1].props("data")).toEqual(
            weatherApiResponse.value.forecast.forecastday[1]
        );
        expect(items[2].props("data")).toEqual(
            weatherApiResponse.value.forecast.forecastday[2]
        );
    });
});
