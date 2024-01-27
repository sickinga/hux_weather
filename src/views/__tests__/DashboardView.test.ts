import { mount } from "@vue/test-utils";
import { UseQueryReturnType } from "@tanstack/vue-query";

import WeatherCard from "@/components/weather-card/WeatherCard.vue";
import * as hooks from "@/components/weather-card/weather-card.hook";
import type { AllWeatherData } from "@/types";
import { weatherApiResponse } from "@/mocks/weather-data.mocks";
import DashboardViewVue from "@/views/DashboardView.vue";
import { setupGlobalTestEnv } from "@/mocks/test-setup";

describe("DashboardView", () => {
    const setupEnv = setupGlobalTestEnv();

    it("renders the view with weather card correctly", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ data: weatherApiResponse } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );
        const wrapper = mount(DashboardViewVue, {
            props: {},
            setupEnv,
        });

        expect(wrapper.find("h1").text()).toBe("Weather Dashboard");

        const card = wrapper.findComponent(WeatherCard);
        expect(card.props("lat")).toBe("48.367470");
        expect(card.props("lng")).toBe("14.516010");
        expect(card.props("locationName")).toBe("Hagenberg im Mühlkreis");
        expect(card.props("tempUnit")).toBe("°C");

        const picker = wrapper.find(".unit-select");
        expect(picker.element.getAttribute("modelValue")).toBe("°C");
    });

    it("should render the picker options correctly", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ data: weatherApiResponse } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );
        const wrapper = mount(DashboardViewVue, {
            props: {},
            setupEnv,
        });

        const picker = wrapper.find(".unit-select");
        expect(picker.exists()).toBe(true);

        const fOption = picker.find(".f-option");
        expect(fOption.exists()).toBe(true);
        expect(fOption.text()).toBe("Fahrenheit");

        const cOption = picker.find(".c-option");
        expect(cOption.exists()).toBe(true);
        expect(cOption.text()).toBe("Celsius");
    });

    it("should use temp unit value from local storage if available", () => {
        jest.spyOn(hooks, "useWeatherApi").mockImplementation(
            () =>
                ({ data: weatherApiResponse } as unknown as UseQueryReturnType<
                    AllWeatherData,
                    Error
                >)
        );

        jest.spyOn(Storage.prototype, "getItem");
        Storage.prototype.getItem = jest.fn().mockReturnValue("°F");

        const wrapper = mount(DashboardViewVue, {
            props: {},
            setupEnv,
        });

        const card = wrapper.findComponent(WeatherCard);
        expect(card.props("tempUnit")).toBe("°F");
    });
});
