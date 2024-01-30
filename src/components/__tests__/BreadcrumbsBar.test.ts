import { shallowMount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import BreadcrumbsBarVue from "../breadcrumbs-bar/BreadcrumbsBar.vue";


jest.mock("vue-router", () => ({
    useRouter: jest.fn(),
}));

function setUseRouterReturnValue(routerValue: { name: string, query?: { lat: string, lng: string, name: string } }) {
    (useRouter as jest.Mock).mockReturnValueOnce({
        currentRoute: {
            value: routerValue,
        },
    });
}

describe("BreadcrumbsBar", () => {
    it("should show nothing if not on details view", async () => {
        setUseRouterReturnValue({ name: "dashboard" });

        const wrapper = shallowMount(BreadcrumbsBarVue);
        expect(wrapper.find(".breadcrumbs-bar").exists()).toBe(false);
    });

    it("should show the breadcrumbs bar if on details view", async () => {
        setUseRouterReturnValue({
            name: "details",
            query: {
                lat: "52.5200",
                lng: "13.4050",
                name: "Berlin, Germany",
            },
        });

        const wrapper = shallowMount(BreadcrumbsBarVue);
        expect(wrapper.find(".breadcrumbs-bar").exists()).toBe(true);
        expect(wrapper.find(".breadcrumbs-bar").text()).toContain("Berlin");
    });
});