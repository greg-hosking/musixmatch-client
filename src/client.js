const { CHARTS, COUNTRIES, DEFAULTS } = require("./constants");
const {
    AlbumService,
    ArtistService,
    GenreService,
    TrackService,
} = require("./services");
const { MusixmatchError } = require("./utils");

class MusixmatchClient {
    static CHARTS = CHARTS;
    static COUNTRIES = COUNTRIES;
    static DEFAULTS = DEFAULTS;

    constructor(apiKey) {
        this.API_KEY = apiKey;
        this.albumService = new AlbumService(this.API_KEY);
        this.artistService = new ArtistService(this.API_KEY);
        this.genreService = new GenreService(this.API_KEY);
        this.trackService = new TrackService(this.API_KEY);
        this.albumService.setArtistService(this.artistService);
        this.albumService.setTrackService(this.trackService);
        this.artistService.setAlbumService(this.albumService);
        this.trackService.setAlbumService(this.albumService);
        this.trackService.setArtistService(this.artistService);
    }

    async getChartingArtists({
        country = DEFAULTS.COUNTRY,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.artistService.getChartingArtists({
            country,
            page,
            pageSize,
        });
    }

    async getChartingTracks({
        chart = DEFAULTS.CHART,
        country = DEFAULTS.COUNTRY,
        hasLyrics,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.trackService.getChartingTracks({
            chart,
            country,
            hasLyrics,
            page,
            pageSize,
        });
    }

    async searchTracks({
        trackQuery,
        artistQuery,
        lyricsQuery,
        trackArtistQuery,
        writerQuery,
        query,
        artistId,
        musicGenreId,
        lyricsLanguage,
        hasLyrics,
        minReleaseDate,
        maxReleaseDate,
        sortByArtistRating,
        sortByTrackRating,
        quorumFactor,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.trackService.searchTracks({
            trackQuery,
            artistQuery,
            lyricsQuery,
            trackArtistQuery,
            writerQuery,
            query,
            artistId,
            musicGenreId,
            lyricsLanguage,
            hasLyrics,
            minReleaseDate,
            maxReleaseDate,
            sortByArtistRating,
            sortByTrackRating,
            quorumFactor,
            page,
            pageSize,
        });
    }

    async getTrack({ commontrackId, trackIsrc } = {}) {
        return await this.trackService.getTrackByCommontrackId({
            commontrackId,
            trackIsrc,
        });
    }

    async getTrackLyrics({ id, commontrackId } = {}) {
        return await this.trackService.getLyricsByTrackId({
            id,
            commontrackId,
        });
    }

    async getTrackLyricsMood({ commontrackId, trackIsrc } = {}) {
        return await this.trackService.getLyricsMoodByTrackId({
            commontrackId,
            trackIsrc,
        });
    }

    async getTrackSnippet({ id } = {}) {
        return await this.trackService.getSnippetByTrackId({ id });
    }

    async getMusicGenres() {
        return await this.genreService.getAllGenres();
    }

    async getMatchingTrackLyrics({ trackQuery, artistQuery, trackIsrc } = {}) {
        return await this.trackService.getMatchingTrackLyrics({
            trackQuery,
            artistQuery,
            trackIsrc,
        });
    }

    async getMatchingTrack({ trackQuery, artistQuery, albumQuery } = {}) {
        return await this.trackService.getMatchingTrack({
            trackQuery,
            artistQuery,
            albumQuery,
        });
    }

    async getArtist({ id, musicbrainzId } = {}) {
        return await this.artistService.getArtistById({
            id,
            musicbrainzId,
        });
    }

    async searchArtists({
        artistQuery,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    }) {
        return await this.artistService.searchArtists({
            artistQuery,
            page,
            pageSize,
        });
    }

    async getArtistAlbums({
        id,
        musicbrainzId,
        groupByAlbumName = true,
        sortByReleaseDate = "desc",
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.albumService.getAlbumsByArtistId({
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
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.artistService.getRelatedArtistsByArtistId({
            id,
            musicbrainzId,
            page,
            pageSize,
        });
    }

    async getAlbum({ id } = {}) {
        return await this.albumService.getAlbumById({
            id,
        });
    }

    async getAlbumTracks({
        id,
        musicbrainzId,
        hasLyrics,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.trackService.getTracksByAlbumId({
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
        country = DEFAULTS.COUNTRY,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.getChartingArtists({ country, page, pageSize });
    }

    async chartTracksGet({
        chart = DEFAULTS.CHART,
        country = DEFAULTS.COUNTRY,
        hasLyrics,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.getChartingTracks({
            chart,
            country,
            hasLyrics,
            page,
            pageSize,
        });
    }

    async trackSearch({
        trackQuery,
        artistQuery,
        lyricsQuery,
        trackArtistQuery,
        writerQuery,
        query,
        artistId,
        musicGenreId,
        lyricsLanguage,
        hasLyrics,
        minReleaseDate,
        maxReleaseDate,
        sortByArtistRating,
        sortByTrackRating,
        quorumFactor,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.searchTracks({
            trackQuery,
            artistQuery,
            lyricsQuery,
            trackArtistQuery,
            writerQuery,
            query,
            artistId,
            musicGenreId,
            lyricsLanguage,
            hasLyrics,
            minReleaseDate,
            maxReleaseDate,
            sortByArtistRating,
            sortByTrackRating,
            quorumFactor,
            page,
            pageSize,
        });
    }

    async trackGet({ commontrackId, trackIsrc } = {}) {
        return await this.getTrack({ commontrackId, trackIsrc });
    }

    async trackLyricsGet({ id, commontrackId } = {}) {
        return await this.getTrackLyrics({ id, commontrackId });
    }

    async trackLyricsMoodGet({ commontrackId, trackIsrc } = {}) {
        return await this.getTrackLyricsMood({ commontrackId, trackIsrc });
    }

    async trackSnippetGet({ id } = {}) {
        return await this.getTrackSnippet({ id });
    }

    async musicGenresGet() {
        return await this.getMusicGenres();
    }

    async matcherLyricsGet({ trackQuery, artistQuery, trackIsrc } = {}) {
        return await this.getMatchingTrackLyrics({
            trackQuery,
            artistQuery,
            trackIsrc,
        });
    }

    async matcherTrackGet({ trackQuery, artistQuery, albumQuery } = {}) {
        return await this.getMatchingTrack({
            trackQuery,
            artistQuery,
            albumQuery,
        });
    }

    async artistGet({ id, musicbrainzId } = {}) {
        return await this.getArtist({ id, musicbrainzId });
    }

    async artistSearch({
        artistQuery,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    }) {
        return await this.searchArtists({
            artistQuery,
            page,
            pageSize,
        });
    }

    async artistAlbumsGet({
        id,
        musicbrainzId,
        groupByAlbumName = true,
        sortByReleaseDate = "desc",
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
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
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.getRelatedArtists({
            id,
            musicbrainzId,
            page,
            pageSize,
        });
    }

    async albumGet({ id } = {}) {
        return await this.getAlbum({ id });
    }

    async albumTracksGet({
        id,
        musicbrainzId,
        hasLyrics,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.getAlbumTracks({
            id,
            musicbrainzId,
            hasLyrics,
            page,
            pageSize,
        });
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
