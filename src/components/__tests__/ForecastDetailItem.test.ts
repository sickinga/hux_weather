import { shallowMount } from "@vue/test-utils";

import type { ForecastData } from "@/types";
import { weatherApiResponse } from "@/mocks/weather-data.mocks";
import ForecastDetailItem from "../forecast-detail-item/ForecastDetailItem.vue";

describe("ForecastDetailItem", () => {
    const fData = weatherApiResponse.value.forecast
        .forecastday[0] as ForecastData;

    it("renders the current temperature", () => {
        const wrapper = shallowMount(ForecastDetailItem, {
            props: { fData },
        });

        expect(wrapper.find(".date").text()).toBe("Jan 23");
        expect(wrapper.find(".temp").text()).toBe("Max: 4.2 °C Min: -4.2 °C");
    });

    it("renders the current temperature based on local storage temp unit", () => {
        jest.spyOn(Storage.prototype, "getItem");
        Storage.prototype.getItem = jest.fn().mockReturnValue("°F");

        const wrapper = shallowMount(ForecastDetailItem, {
            props: { fData },
        });

        expect(wrapper.find(".temp").text()).toBe("Max: 4.2 °F Min: -4.2 °F");
    });

    it("renders the current condition", () => {
        const wrapper = shallowMount(ForecastDetailItem, {
            props: { fData },
        });

        expect(wrapper.find(".condition").text()).toBe("Cloudy");
        expect(wrapper.html()).toContain(
            '<img class="forecast-icon" src="cloud.png" alt="Cloudy">'
        );
    });

    it("renders further weather data", () => {
        const wrapper = shallowMount(ForecastDetailItem, {
            props: { fData },
        });

        expect(wrapper.find(".further-data").text()).toBe(
            "Max. wind: 10 km/h  Total precipitation: 0.10 mm  Average humidity: 50 %"
        );
    });

    it("renders the astro data", () => {
        const wrapper = shallowMount(ForecastDetailItem, {
            props: { fData },
        });

        expect(wrapper.find(".astro").text()).toBe(
            "Sunrise: 07:00 AM -> Sunset: 05:00 PM"
        );
    });

    it("renders the line chart wrapper with the correct props", () => {
        const wrapper = shallowMount(ForecastDetailItem, {
            props: { fData },
        });

        const lW = wrapper.findComponent({ name: "ForecastLineChartWrapper" });
        expect(lW.props("tempKey")).toBe("temp_f");
        expect(lW.props("hourData")).toEqual(
            weatherApiResponse.value.forecast.forecastday[0].hour
        );
    });
});
