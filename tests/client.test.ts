import { Chart, Country } from "../src/enums";
import { MusixmatchClient } from "../src/client";

describe("MusixmatchClient", () => {
    it("should construct with default values", () => {
        const client = new MusixmatchClient("your-api-key");
        expect(client.apiKey).toBe("your-api-key");
        expect(client.defaults.chart).toBe(Chart.Top);
        expect(client.defaults.country).toBe(Country.UnitedStatesOfAmerica);
        expect(client.defaults.page).toBe(1);
        expect(client.defaults.pageSize).toBe(10);
    });

    it("should override defaults", () => {
        const client = new MusixmatchClient("your-api-key", {
            chart: Chart.Hot,
            country: Country.Italy,
            pageSize: 50,
        });
        expect(client.defaults.chart).toBe(Chart.Hot);
        expect(client.defaults.country).toBe(Country.Italy);
        expect(client.defaults.pageSize).toBe(50);
    });

    it("should throw an error if an invalid apiKey is provided", () => {
        expect(() => {
            new MusixmatchClient("");
        }).toThrow();
    });
});
