import { shallowMount } from "@vue/test-utils";

import type { CurrentWeatherData } from "@/types";
import { weatherApiResponse } from "@/mocks/weather-data.mocks";
import WeatherDetailCard from "../weather-detail-card/WeatherDetailCard.vue";

describe("WeatherDetailCard", () => {
    const currentData = weatherApiResponse.value.current as CurrentWeatherData;

    it("renders the current temperature", () => {
        const wrapper = shallowMount(WeatherDetailCard, {
            props: { currentData },
        });

        expect(wrapper.find("h4").text()).toBe("Current weather:");
        expect(wrapper.find(".current-temp").text()).toBe("1.2 °C");
        expect(wrapper.find(".feels-like").text()).toBe("Feels like: -2.2 °C");
    });

    it("renders the current temperature based on local storage temp unit", () => {
        jest.spyOn(Storage.prototype, "getItem");
        Storage.prototype.getItem = jest.fn().mockReturnValue("°F");

        const wrapper = shallowMount(WeatherDetailCard, {
            props: { currentData },
        });

        expect(wrapper.find(".current-temp").text()).toBe("1.2 °F");
        expect(wrapper.find(".feels-like").text()).toBe("Feels like: -2.2 °F");
    });

    it("renders the current condition", () => {
        const wrapper = shallowMount(WeatherDetailCard, {
            props: { currentData },
        });

        expect(wrapper.find(".condition").text()).toBe("Sunny");
        expect(wrapper.html()).toContain(
            '<img class="current-icon" src="sun.png" alt="Sunny">'
        );
    });

    it("renders further weather data", () => {
        const wrapper = shallowMount(WeatherDetailCard, {
            props: { currentData },
        });

        expect(wrapper.find(".further-data").text()).toBe(
            "Wind: 10 km/hPrecipitation: 0.1 mmHumidity: 50 %"
        );
    });
});
