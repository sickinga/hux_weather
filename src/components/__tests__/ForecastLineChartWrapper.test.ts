import { shallowMount } from "@vue/test-utils";

import type { HourData } from "@/types";
import {
    weatherApiResponse,
    chartLabels,
    tempChartData,
} from "@/mocks/weather-data.mocks";
import ForecastLineChartWrapper from "../forecast-line-chart/ForecastLineChartWrapper.vue";

describe("ForecastLineChartWrapper", () => {
    const hourData = weatherApiResponse.value.forecast.forecastday[0]
        .hour as HourData[];
    const tempKey = "temp_c";

    it("renders the forecast line chart with the correct prop", () => {
        const wrapper = shallowMount(ForecastLineChartWrapper, {
            props: { hourData, tempKey },
        });

        const chart = wrapper.findComponent({ name: "ForecastLineChart" });
        const chartData = chart.props("data");
        expect(chartData.labels).toEqual(chartLabels);
        expect(chartData.datasets).toEqual([
            {
                backgroundColor: "grey",
                label: "Temperature",
                data: tempChartData,
            },
        ]);
    });
});
