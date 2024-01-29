import { shallowMount, mount } from "@vue/test-utils";
import { UseQueryReturnType } from "@tanstack/vue-query";

import * as hooks from "@/components/weather-card/weather-card.hook";
import type { AllWeatherData } from "@/types";
import { weatherApiResponse } from "@/mocks/weather-data.mocks";
import DetailsView from "../DetailsView.vue";
import { setupGlobalTestEnv } from "@/mocks/test-setup";

jest.mock("vue-router", () => ({
    useRoute: jest.fn().mockReturnValue({
        params: {
            lat: "52.5200",
            lng: "13.4050",
            name: "Berlin",
        },
    }),
}));

describe("DetailsView", () => {
    const name = "Berlin";
    const setupEnv = setupGlobalTestEnv();

    it("renders the location name", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ isPending: true } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );
        const wrapper = shallowMount(DetailsView, {
            setupEnv,
        });

        expect(wrapper.find("h1").text()).toBe(name);
    });

    it("renders a spinner when data is loading", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ isPending: true } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );

        const wrapper = shallowMount(DetailsView, {
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
        const wrapper = shallowMount(DetailsView, {
            setupEnv,
        });
        const errorMessage = wrapper.find(".error-message");
        expect(errorMessage.text()).toBe("Error fetching data");
    });

    it("renders the current weather detail card", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ data: weatherApiResponse } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );
        const wrapper = mount(DetailsView, {
            setupEnv,
        });

        const card = wrapper.findComponent({ name: "WeatherDetailCard" });
        expect(card.props("currentData")).toEqual(
            weatherApiResponse.value.current
        );
    });

    it("renders the forecast detail cards", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ data: weatherApiResponse } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );
        const wrapper = mount(DetailsView, {
            setupEnv,
        });

        const cards = wrapper.findAllComponents({ name: "ForecastDetailItem" });
        expect(cards[0].props("fData")).toEqual(
            weatherApiResponse.value.forecast.forecastday[0]
        );
        expect(cards[1].props("fData")).toEqual(
            weatherApiResponse.value.forecast.forecastday[1]
        );
        expect(cards[2].props("fData")).toEqual(
            weatherApiResponse.value.forecast.forecastday[2]
        );
    });
});
