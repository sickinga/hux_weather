import { shallowMount } from "@vue/test-utils";
import ForescastListItem from "@/components/forecast-list-item/ForecastListItem.vue";

describe("ForecastListItem.vue", () => {
    it("render item text correctly", () => {
        const data = {
            date: "2024-01-23",
            day: {
                maxtemp_c: 1.2,
                mintemp_c: -2.2,
                condition: { text: "Sunny" },
            },
        };
        const tempUnit = "C";
        const tempUnitPostfix = "_c";
        const wrapper = shallowMount(ForescastListItem, {
            props: { tempUnit, tempUnitPostfix, data },
        });
        expect(wrapper.text()).toMatch("Jan 231.2 C | -2.2 C");
        expect(wrapper.html()).toContain(
            '<img class="forecast-icon" alt="Sunny"></div>'
        );
    });
});
