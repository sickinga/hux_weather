import { mount, shallowMount } from "@vue/test-utils";
import CitySearchVue from "../city-search/CitySearch.vue";
import { citySearchResponse, citySearchTerm } from "@/mocks/city-search.mocks";
import { setupGlobalTestEnv } from "@/mocks/test-setup";
import { UseQueryReturnType } from "@tanstack/vue-query";
import { GeocoderResult } from "@/types";
import * as hooks from "../city-search/city-search.hook";

describe("useCitySearch", () => {
    const setupEnv = setupGlobalTestEnv();

    it("should show results when search term is 3 or more characters", async () => {
        // const test = jest.spyOn(hooks, "useCitySearch").mockImplementation(
        //     () => ({
        //         data: citySearchResponse,
        //     } as unknown as UseQueryReturnType<GeocoderResult, Error>)
        // );

        // const component = mount(CitySearchVue, {props: {}, setupEnv});
        // expect(component.findAll(".city-search__suggestion")).toHaveLength(0);

        // const input = component.find(".city-search__input");
        // input.setValue(citySearchTerm.value);

        // // await component.find(".city-search__input").setValue(citySearchTerm.value);

        // expect(test).toHaveBeenCalled();
        // expect(component.findAll(".city-search__suggestion")).toHaveLength(3);
    });
});
