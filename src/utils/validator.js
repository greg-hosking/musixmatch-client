const { CHARTS, COUNTRIES } = require("../constants");
const MusixmatchError = require("./errors");

class MusixmatchValidator {
    static validateChart(chart) {
        if (!Object.values(CHARTS).includes(chart)) {
            throw new MusixmatchError(
                400,
                `Invalid chart: ${chart}. Check MusixmatchClient.CHARTS for valid charts.`
            );
        }
    }

    static validateCountry(country) {
        if (!Object.values(COUNTRIES).includes(country)) {
            throw new MusixmatchError(
                400,
                `Invalid country: ${country}. Check MusixmatchClient.COUNTRIES for valid countries.`
            );
        }
    }

    static validatePage(page) {
        if (!Number.isInteger(page) || page < 1) {
            throw new MusixmatchError(
                400,
                `Invalid page: ${page}. The page must be a positive integer.`
            );
        }
    }

    static validatePageSize(pageSize) {
        if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
            throw new MusixmatchError(
                400,
                `Invalid page size: ${pageSize}. The page size must be an integer between 1 and 100.`
            );
        }
    }
}

module.exports = MusixmatchValidator;
