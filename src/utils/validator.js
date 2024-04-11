const { CHARTS, COUNTRIES } = require("../constants");
const MusixmatchError = require("./errors");

class MusixmatchValidator {
    static validateApiKey(apiKey) {
        if (!apiKey) {
            throw new MusixmatchError(
                400,
                "Missing required parameter: apiKey"
            );
        }
        if (typeof apiKey !== "string" || !apiKey.trim()) {
            throw new MusixmatchError(
                400,
                "Invalid parameter: apiKey. The value must be a non-empty string."
            );
        }
    }

    static validateBoolean(name, value, optional = false) {
        if (optional && typeof value === "undefined") {
            return;
        }
        if ([true, "true", 1].includes(value)) {
            return true;
        }
        if ([false, "false", 0].includes(value)) {
            return false;
        }
        throw new MusixmatchError(
            400,
            `Invalid parameter: ${name}. The value must be a boolean, 'true', 'false', 0, or 1.`
        );
    }

    static validateOrder(name, value, optional = false) {
        if (optional && typeof value === "undefined") {
            return;
        }
        if (typeof value !== "string" || !value.trim()) {
            throw new MusixmatchError(
                400,
                `Invalid parameter: ${name}. The value must be a non-empty string.`
            );
        }
        value = value.toLowerCase().trim();
        if (!["asc", "desc"].includes(value)) {
            throw new MusixmatchError(
                400,
                `Invalid parameter: ${name}. The value must be 'asc' or 'desc'.`
            );
        }
        return value;
    }

    static validateChart(chart) {
        if (!Object.values(CHARTS).includes(chart)) {
            throw new MusixmatchError(
                400,
                "Invalid chart. Check MusixmatchClient.CHARTS for valid charts."
            );
        }
    }

    static validateCountry(country) {
        if (!Object.values(COUNTRIES).includes(country)) {
            throw new MusixmatchError(
                400,
                "Invalid country. Check MusixmatchClient.COUNTRIES for valid countries."
            );
        }
    }

    static validatePage(page) {
        if (!Number.isInteger(page) || page < 1) {
            throw new MusixmatchError(
                400,
                "Invalid page. The page must be a positive integer."
            );
        }
    }

    static validatePageSize(pageSize) {
        if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
            throw new MusixmatchError(
                400,
                "Invalid page size. The page size must be an integer between 1 and 100."
            );
        }
    }
}

module.exports = MusixmatchValidator;
