import { describe, expect, it } from "vitest";
import CitySearchVue from "./CitySearch.vue";
import { mount } from "@vue/test-utils";
import { citySearchTerm } from "@/mocks/city-search.mocks";
import { setupGlobalTestEnv } from "@/mocks/test-setup";

describe("useCitySearch", () => {
    it("should show results when search term is 3 or more characters", async () => {
        const component = mount(CitySearchVue, setupGlobalTestEnv());
        expect(component.findAll(".city-search__suggestion")).toHaveLength(0);

        await component.find(".city-search__input").setValue(citySearchTerm.value);

        expect(component.findAll(".city-search__suggestion")).toHaveLength(3);
    });
});
