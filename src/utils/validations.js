const { CHARTS, COUNTRIES, ERRORS } = require("../constants");

function validateChart(chart) {
    if (!Object.values(CHARTS).includes(chart)) {
        throw new Error(ERRORS.INVALID_CHART);
    }
}

function validateCountry(country) {
    if (!Object.values(COUNTRIES).includes(country)) {
        throw new Error(ERRORS.INVALID_COUNTRY);
    }
}

function validatePage(page) {
    if (!(Number.isInteger(page) && page >= 1)) {
        throw new Error(ERRORS.INVALID_PAGE);
    }
}

function validatePageSize(pageSize) {
    if (!(Number.isInteger(pageSize) && pageSize >= 1 && pageSize <= 100)) {
        throw new Error(ERRORS.INVALID_PAGE_SIZE);
    }
}

module.exports = {
    validateChart,
    validateCountry,
    validatePage,
    validatePageSize,
};
