const { CHARTS, COUNTRIES, DEFAULTS } = require("./constants");
const {
    AlbumController,
    ArtistController,
    GenreController,
    LyricsController,
    TrackController,
} = require("./controllers");
const { MusixmatchError } = require("./utils");

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

    async getChartingArtists({
        country = MusixmatchClient.DEFAULTS.COUNTRY,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await ArtistController.getChartingArtists({
            apiKey: this.API_KEY,
            country,
            page,
            pageSize,
        });
    }

    async getChartingTracks() {
        // TO DO
    }

    async searchTracks() {
        // TO DO
    }

    async getTrack() {
        // TO DO
    }

    async getTrackLyrics() {
        // TO DO
    }

    async getTrackLyricsMood() {
        // TO DO
    }

    async getTrackSnippet() {
        // TO DO
    }

    async getMusicGenres() {
        return await GenreController.getAllGenres({ apiKey: this.API_KEY });
    }

    async getMatchingTrackLyrics() {
        // TO DO
    }

    async getMatchingTrack() {
        // TO DO
    }

    async getArtist({ id, musicbrainzId } = {}) {
        return await ArtistController.getArtistById({
            apiKey: this.API_KEY,
            id,
            musicbrainzId,
        });
    }

    async searchArtists({
        artist,
        idFilter,
        musicbrainzIdFilter,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    }) {
        return await ArtistController.search({
            apiKey: this.API_KEY,
            artist,
            idFilter,
            musicbrainzIdFilter,
            page,
            pageSize,
        });
    }

    async getArtistAlbums({
        id,
        musicbrainzId,
        groupByAlbumName = true,
        sortByReleaseDate = "desc",
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await ArtistController.getAlbumsByArtistId({
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
        return await ArtistController.getRelatedArtistsByArtistId({
            apiKey: this.API_KEY,
            id,
            musicbrainzId,
            page,
            pageSize,
        });
    }

    async getAlbum({ id } = {}) {
        return await AlbumController.getAlbumById({
            apiKey: this.API_KEY,
            id,
        });
    }

    async getAlbumTracks({
        id,
        musicbrainzId,
        hasLyrics,
        page = MusixmatchClient.DEFAULTS.PAGE,
        pageSize = MusixmatchClient.DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await AlbumController.getTracksByAlbumId({
            apiKey: this.API_KEY,
            id,
            musicbrainzId,
            hasLyrics,
            page,
            pageSize,
        });
    }

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
        return await this.getChartingArtists({ country, page, pageSize });
    }

    async chartTracksGet() {
        // TO DO
    }

    async trackSearch() {
        // TO DO
    }

    async trackGet() {
        // TO DO
    }

    async trackLyricsGet() {
        // TO DO
    }

    async trackLyricsMoodGet() {
        // TO DO
    }

    async trackSnippetGet() {
        // TO DO
    }

    async musicGenresGet() {
        return await this.getMusicGenres();
    }

    async matcherLyricsGet() {
        // TO DO
    }

    async matcherTrackGet() {
        // TO DO
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

    async albumGet() {
        // TO DO
    }

    async albumTracksGet() {
        // TO DO
    }

    /*********/
    /* TO DO */
    /*********/
    async trackLyricsPost() {
        throw new MusixmatchError(501);
    }
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
    async matcherSubtitleGet() {
        throw new MusixmatchError(501);
    }
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
