const { CHARTS, COUNTRIES, DEFAULTS, ERRORS } = require("./constants");
const { Album, Artist, Genre, Lyrics, Track } = require("./entities");

/**
 *
 */
class Client {
    static CHARTS = CHARTS;
    static COUNTRIES = COUNTRIES;
    static DEFAULTS = DEFAULTS;
    static ERRORS = ERRORS;

    constructor(apiKey) {
        this.API_KEY = apiKey;
    }

    async getTopArtists({
        country = DEFAULTS.COUNTRY,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await Artist.getTopArtists({
            apiKey: this.API_KEY,
            country,
            page,
            pageSize,
        });
    }
}

module.exports = Client;
