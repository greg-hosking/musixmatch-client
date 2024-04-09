const { CHARTS, COUNTRIES, DEFAULTS } = require("./constants");
const { Album, Artist, Genre, Lyrics, Track } = require("./entities");
const MusixmatchError = require("./utils/errors");

/**
 *
 */
class MusixmatchClient {
    static CHARTS = CHARTS;
    static COUNTRIES = COUNTRIES;
    static DEFAULTS = DEFAULTS;

    constructor(apiKey) {
        this.API_KEY = apiKey;
    }

    async getTopArtists({
        country = MusixmatchClient.DEFAULTS.COUNTRY,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await Artist.getTopArtists({
            apiKey: this.API_KEY,
            country,
            page,
            pageSize,
        });
    }

    async getTopTracks() {}

    async searchTracks() {}

    async getTrack() {}

    async getTrackLyrics() {}

    async getTrackLyricsMood() {}

    async getTrackSnippet() {}

    async getMusicGenres() {
        return await Genre.getAllGenres({ apiKey: this.API_KEY });
    }

    async getMatchingTrackLyrics() {}

    async getMatchingTrack() {}

    async getArtist({ id, musicbrainzId } = {}) {
        return await Artist.getArtist({
            apiKey: this.API_KEY,
            id,
            musicbrainzId,
        });
    }

    async searchArtists({
        query,
        idFilter,
        musicbrainzIdFilter,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    }) {
        return await Artist.search({
            apiKey: this.API_KEY,
            query,
            idFilter,
            musicbrainzIdFilter,
            page,
            pageSize,
        });
    }

    async getArtistAlbums({
        id,
        musicbrainzId,
        groupByAlbumName,
        sortByReleaseDate,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await Artist.getArtistAlbums({
            apiKey: this.API_KEY,
            id,
            musicbrainzId,
            groupByAlbumName,
            sortByReleaseDate,
            page,
            pageSize,
        });
    }

    async getRelatedArtists({
        id,
        musicbrainzId,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await Artist.getRelatedArtists({
            apiKey: this.API_KEY,
            id,
            musicbrainzId,
            page,
            pageSize,
        });
    }

    async getAlbum() {}

    async getAlbumTracks() {}

    /*********************************************************************/
    /* Endpoint-named methods matching the Musixmatch API conventions.   */
    /* Designed for users accustomed to the Musixmatch API, these        */
    /* methods provide a straightforward transition to this client.      */
    /*********************************************************************/

    async chartArtistsGet({
        country = MusixmatchClient.DEFAULTS.COUNTRY,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.getTopArtists({ country, page, pageSize });
    }

    async chartTracksGet() {}

    async trackSearch() {}

    async trackGet() {}

    async trackLyricsGet() {}

    async trackLyricsPost() {
        throw new MusixmatchError(501);
    }

    async trackLyricsMoodGet() {}

    async trackSnippetGet() {}

    async trackSubtitleGet() {
        throw new MusixmatchError(501);
    }

    async trackRichsyncGet() {
        throw new MusixmatchError(501);
    }

    async trackLyricsTranslationGet() {
        throw new MusixmatchError(501);
    }

    async trackSubtitleTranslationGet() {
        throw new MusixmatchError(501);
    }

    async musicGenresGet() {
        return await this.getMusicGenres();
    }

    async matcherLyricsGet() {}

    async matcherTrackGet() {}

    async matcherSubtitleGet() {
        throw new MusixmatchError(501);
    }

    async artistGet({ id, musicbrainzId } = {}) {
        return await this.getArtist({ id, musicbrainzId });
    }

    async artistSearch({
        query,
        idFilter,
        musicbrainzIdFilter,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    }) {
        return await this.searchArtists({
            query,
            idFilter,
            musicbrainzIdFilter,
            page,
            pageSize,
        });
    }

    async artistAlbumsGet({
        id,
        musicbrainzId,
        groupByAlbumName,
        sortByReleaseDate,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.getArtistAlbums({
            id,
            musicbrainzId,
            groupByAlbumName,
            sortByReleaseDate,
            page,
            pageSize,
        });
    }

    async artistRelatedGet({
        id,
        musicbrainzId,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.getRelatedArtists({
            id,
            musicbrainzId,
            page,
            pageSize,
        });
    }

    async albumGet() {}

    async albumTracksGet() {}

    async trackingUrlGet() {
        throw new MusixmatchError(501);
    }

    async catalogueDumpGet() {
        throw new MusixmatchError(501);
    }

    async workPost() {
        throw new MusixmatchError(501);
    }

    async workValidityPost() {
        throw new MusixmatchError(501);
    }
}

module.exports = MusixmatchClient;
