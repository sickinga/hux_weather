export const weatherApiResponse = {
    value: {
        current: {
            temp_c: 1.2,
            feelslike_c: -2.2,
            condition: { text: "Sunny", icon: "sun.png" },
            last_updated: "2021-01-23 12:00",
        },
        forecast: {
            forecastday: [
                {
                    date: "2024-01-23",
                    day: {
                        maxtemp_c: 4.2,
                        mintemp_c: -4.2,
                        condition: {
                            text: "Cloudy",
                            icon: "cloud.png",
                        },
                    },
                },
                {
                    date: "2024-01-24",
                    day: {
                        maxtemp_c: 3.2,
                        mintemp_c: -3.2,
                        condition: { text: "Sunny", icon: "sun.png" },
                    },
                },
                {
                    date: "2024-01-25",
                    day: {
                        maxtemp_c: 1.2,
                        mintemp_c: -2.2,
                        condition: {
                            text: "Cloudy",
                            icon: "cloud.png",
                        },
                    },
                },
            ],
        },
    },
};
