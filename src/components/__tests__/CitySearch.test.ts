import { mount } from "@vue/test-utils";
import CitySearchVue from "../city-search/CitySearch.vue";
import { citySearchResponse } from "@/mocks/city-search.mocks";
import { setupGlobalTestEnv } from "@/mocks/test-setup";
import * as hooks from "@/components/city-search/city-search.hook";
import { UseQueryReturnType } from "@tanstack/vue-query";
import { GeocoderResult } from "@/types";

jest.spyOn(hooks, "useCitySearch").mockImplementation(
    () => ({
        data: citySearchResponse,
    } as unknown as UseQueryReturnType<GeocoderResult, Error>)
);

describe("useCitySearch", () => {
    const setupEnv = setupGlobalTestEnv();

    it("should render", () => {
        const wrapper = mount(CitySearchVue, { setupEnv });
        expect(wrapper.find(".city-search__input").exists()).toBe(true);
        expect(wrapper.find(".city-search__suggestions").exists()).toBe(true);
        expect(wrapper.findAll(".city-search__suggestion")).toHaveLength(0);
    });

    // Did not find a way to test this component further because of the bootstrap-vue components
});
