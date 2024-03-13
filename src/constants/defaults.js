const CHARTS = require("./charts");
const COUNTRIES = require("./countries");

const DEFAULTS = Object.freeze({
    CHART: CHARTS.TOP,
    COUNTRY: COUNTRIES.UNITED_STATES_OF_AMERICA,
    PAGE: 1,
    PAGE_SIZE: 10,
});

module.exports = DEFAULTS;
