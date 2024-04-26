import { Chart, Country } from "./enums";
import { MusixmatchError } from "./utils/error";
import { FetchOptions } from "./types/common";
import GenreService from "./services/genre.service";

type Defaults = {
    chart: Chart;
    country: Country;
    page: number;
    pageSize: number;
};

type DefaultOverrideOptions = {
    chart?: Chart;
    country?: Country;
    pageSize?: number;
};

class MusixmatchClient {
    static readonly Chart = Chart;
    static readonly Country = Country;
    static readonly baseUrl = "https://api.musixmatch.com/ws/1.1/";
    apiKey: string;
    defaults: Defaults;
    // albumService: AlbumService;
    // artistService: ArtistService;
    genreService: GenreService;
    // trackService: TrackService;

    // createError(code: number, message?: string): MusixmatchError {
    //     return new MusixmatchError(code, message);
    // }

    createFetchFn() {
        return async ({
            endpoint,
            params = {},
            method = "GET",
        }: FetchOptions = {}): Promise<any> => {
            if (typeof endpoint !== "string" || !endpoint.length) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter: endpoint. Value must be a non-empty string."
                );
            }
            params.apikey = this.apiKey;
            const queryParams = new URLSearchParams(params).toString();
            const url = `${MusixmatchClient.baseUrl}${endpoint}?${queryParams}`;
            const response = await fetch(url, { method });
            const data = await response.json();
            const code = data?.message?.header?.status_code;
            if (code !== 200) {
                throw new MusixmatchError(code);
            }
            return data;
        };
    }

    constructor(
        apiKey: string,
        {
            chart = Chart.Top,
            country = Country.UnitedStatesOfAmerica,
            pageSize = 10,
        }: DefaultOverrideOptions = {}
    ) {
        if (typeof apiKey !== "string" || !apiKey.length) {
            throw new Error(
                `(MusixmatchClient.constructor) Missing required parameter: apiKey (${apiKey}). Value must be a non-empty string.`
            );
        }
        if (chart && !Object.values(Chart).includes(chart)) {
            throw new Error(
                `(MusixmatchClient.constructor) Invalid parameter: defaultOverrides.chart (${chart}). Check MusixmatchClient.Chart for acceptable values.`
            );
        }
        if (country && !Object.values(Country).includes(country)) {
            throw new Error(
                `(MusixmatchClient.constructor) Invalid parameter: defaultOverrides.country (${country}). Check MusixmatchClient.Country for acceptable values.`
            );
        }
        if (
            typeof pageSize !== "undefined" &&
            (typeof pageSize !== "number" || pageSize < 1 || pageSize > 100)
        ) {
            throw new Error(
                `(MusixmatchClient.constructor) Invalid parameter: defaultOverrides.pageSize (${pageSize}). Value must be an integer between 1 and 100.`
            );
        }
        this.apiKey = apiKey;
        console.log("constructor this", this);

        this.defaults = {
            chart,
            country,
            page: 1,
            pageSize,
        };

        // this.albumService = new AlbumService(
        //     this.fetch,
        //     this.defaults,
        //     this.createError
        // );
        // this.artistService = new ArtistService(
        //     this.fetch,
        //     this.defaults,
        //     this.createError
        // );
        this.genreService = new GenreService(this.createFetchFn());
        // this.trackService = new TrackService(
        //     this.fetch,
        //     this.defaults,
        //     this.createError
        // );
        // this.albumService.setArtistService(this.artistService);
        // this.albumService.setTrackService(this.trackService);
        // this.artistService.setAlbumService(this.albumService);
        // this.trackService.setAlbumService(this.albumService);
        // this.trackService.setArtistService(this.artistService);
    }

    // async getChartingArtists({
    //     country = DEFAULTS.COUNTRY,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.artistService.getChartingArtists({
    //         country,
    //         page,
    //         pageSize,
    //     });
    // }

    // async getChartingTracks({
    //     chart = DEFAULTS.CHART,
    //     country = DEFAULTS.COUNTRY,
    //     hasLyrics,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.trackService.getChartingTracks({
    //         chart,
    //         country,
    //         hasLyrics,
    //         page,
    //         pageSize,
    //     });
    // }

    // async searchTracks({
    //     trackQuery,
    //     artistQuery,
    //     lyricsQuery,
    //     trackArtistQuery,
    //     writerQuery,
    //     query,
    //     artistId,
    //     musicGenreId,
    //     lyricsLanguage,
    //     hasLyrics,
    //     minReleaseDate,
    //     maxReleaseDate,
    //     sortByArtistRating,
    //     sortByTrackRating,
    //     quorumFactor,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.trackService.searchTracks({
    //         trackQuery,
    //         artistQuery,
    //         lyricsQuery,
    //         trackArtistQuery,
    //         writerQuery,
    //         query,
    //         artistId,
    //         musicGenreId,
    //         lyricsLanguage,
    //         hasLyrics,
    //         minReleaseDate,
    //         maxReleaseDate,
    //         sortByArtistRating,
    //         sortByTrackRating,
    //         quorumFactor,
    //         page,
    //         pageSize,
    //     });
    // }

    // async getTrack({ commontrackId, trackIsrc } = {}) {
    //     return await this.trackService.getTrackByCommontrackId({
    //         commontrackId,
    //         trackIsrc,
    //     });
    // }

    // async getTrackLyrics({ id, commontrackId } = {}) {
    //     return await this.trackService.getLyricsByTrackId({
    //         id,
    //         commontrackId,
    //     });
    // }

    // async getTrackLyricsMood({ commontrackId, trackIsrc } = {}) {
    //     return await this.trackService.getLyricsMoodByTrackId({
    //         commontrackId,
    //         trackIsrc,
    //     });
    // }

    // async getTrackSnippet({ id } = {}) {
    //     return await this.trackService.getSnippetByTrackId({ id });
    // }

    // async getMusicGenres() {
    //     return await this.genreService.getAllGenres();
    // }

    // async getMatchingTrackLyrics({ trackQuery, artistQuery, trackIsrc } = {}) {
    //     return await this.trackService.getMatchingTrackLyrics({
    //         trackQuery,
    //         artistQuery,
    //         trackIsrc,
    //     });
    // }

    // async getMatchingTrack({ trackQuery, artistQuery, albumQuery } = {}) {
    //     return await this.trackService.getMatchingTrack({
    //         trackQuery,
    //         artistQuery,
    //         albumQuery,
    //     });
    // }

    // async getArtist({ id, musicbrainzId } = {}) {
    //     return await this.artistService.getArtistById({
    //         id,
    //         musicbrainzId,
    //     });
    // }

    // async searchArtists({
    //     artistQuery,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // }) {
    //     return await this.artistService.searchArtists({
    //         artistQuery,
    //         page,
    //         pageSize,
    //     });
    // }

    // async getArtistAlbums({
    //     id,
    //     musicbrainzId,
    //     groupByAlbumName = true,
    //     sortByReleaseDate = "desc",
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.albumService.getAlbumsByArtistId({
    //         id,
    //         musicbrainzId,
    //         groupByAlbumName,
    //         sortByReleaseDate,
    //         page,
    //         pageSize,
    //     });
    // }

    // async getRelatedArtists({
    //     id,
    //     musicbrainzId,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.artistService.getRelatedArtistsByArtistId({
    //         id,
    //         musicbrainzId,
    //         page,
    //         pageSize,
    //     });
    // }

    // async getAlbum({ id } = {}) {
    //     return await this.albumService.getAlbumById({
    //         id,
    //     });
    // }

    // async getAlbumTracks({
    //     id,
    //     musicbrainzId,
    //     hasLyrics,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.trackService.getTracksByAlbumId({
    //         id,
    //         musicbrainzId,
    //         hasLyrics,
    //         page,
    //         pageSize,
    //     });
    // }

    // /*********************************************************************/
    // /* Endpoint-named methods matching the Musixmatch API conventions.   */
    // /* Designed for users accustomed to the Musixmatch API, these        */
    // /* methods provide a straightforward transition to this client.      */
    // /*********************************************************************/

    // async chartArtistsGet({
    //     country = DEFAULTS.COUNTRY,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.getChartingArtists({ country, page, pageSize });
    // }

    // async chartTracksGet({
    //     chart = DEFAULTS.CHART,
    //     country = DEFAULTS.COUNTRY,
    //     hasLyrics,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.getChartingTracks({
    //         chart,
    //         country,
    //         hasLyrics,
    //         page,
    //         pageSize,
    //     });
    // }

    // async trackSearch({
    //     trackQuery,
    //     artistQuery,
    //     lyricsQuery,
    //     trackArtistQuery,
    //     writerQuery,
    //     query,
    //     artistId,
    //     musicGenreId,
    //     lyricsLanguage,
    //     hasLyrics,
    //     minReleaseDate,
    //     maxReleaseDate,
    //     sortByArtistRating,
    //     sortByTrackRating,
    //     quorumFactor,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.searchTracks({
    //         trackQuery,
    //         artistQuery,
    //         lyricsQuery,
    //         trackArtistQuery,
    //         writerQuery,
    //         query,
    //         artistId,
    //         musicGenreId,
    //         lyricsLanguage,
    //         hasLyrics,
    //         minReleaseDate,
    //         maxReleaseDate,
    //         sortByArtistRating,
    //         sortByTrackRating,
    //         quorumFactor,
    //         page,
    //         pageSize,
    //     });
    // }

    // async trackGet({ commontrackId, trackIsrc } = {}) {
    //     return await this.getTrack({ commontrackId, trackIsrc });
    // }

    // async trackLyricsGet({ id, commontrackId } = {}) {
    //     return await this.getTrackLyrics({ id, commontrackId });
    // }

    // async trackLyricsMoodGet({ commontrackId, trackIsrc } = {}) {
    //     return await this.getTrackLyricsMood({ commontrackId, trackIsrc });
    // }

    // async trackSnippetGet({ id } = {}) {
    //     return await this.getTrackSnippet({ id });
    // }

    // async musicGenresGet() {
    //     return await this.getMusicGenres();
    // }

    // async matcherLyricsGet({ trackQuery, artistQuery, trackIsrc } = {}) {
    //     return await this.getMatchingTrackLyrics({
    //         trackQuery,
    //         artistQuery,
    //         trackIsrc,
    //     });
    // }

    // async matcherTrackGet({ trackQuery, artistQuery, albumQuery } = {}) {
    //     return await this.getMatchingTrack({
    //         trackQuery,
    //         artistQuery,
    //         albumQuery,
    //     });
    // }

    // async artistGet({ id, musicbrainzId } = {}) {
    //     return await this.getArtist({ id, musicbrainzId });
    // }

    // async artistSearch({
    //     artistQuery,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // }) {
    //     return await this.searchArtists({
    //         artistQuery,
    //         page,
    //         pageSize,
    //     });
    // }

    // async artistAlbumsGet({
    //     id,
    //     musicbrainzId,
    //     groupByAlbumName = true,
    //     sortByReleaseDate = "desc",
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.getArtistAlbums({
    //         id,
    //         musicbrainzId,
    //         groupByAlbumName,
    //         sortByReleaseDate,
    //         page,
    //         pageSize,
    //     });
    // }

    // async artistRelatedGet({
    //     id,
    //     musicbrainzId,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.getRelatedArtists({
    //         id,
    //         musicbrainzId,
    //         page,
    //         pageSize,
    //     });
    // }

    // async albumGet({ id } = {}) {
    //     return await this.getAlbum({ id });
    // }

    // async albumTracksGet({
    //     id,
    //     musicbrainzId,
    //     hasLyrics,
    //     page = DEFAULTS.PAGE,
    //     pageSize = DEFAULTS.PAGE_SIZE,
    // } = {}) {
    //     return await this.getAlbumTracks({
    //         id,
    //         musicbrainzId,
    //         hasLyrics,
    //         page,
    //         pageSize,
    //     });
    // }

    // /*********/
    // /* TO DO */
    // /*********/
    // async trackLyricsPost() {
    //     throw new MusixmatchError(501);
    // }
    // async trackSubtitleGet() {
    //     throw new MusixmatchError(501);
    // }

    // async trackRichsyncGet() {
    //     throw new MusixmatchError(501);
    // }

    // async trackLyricsTranslationGet() {
    //     throw new MusixmatchError(501);
    // }

    // async trackSubtitleTranslationGet() {
    //     throw new MusixmatchError(501);
    // }
    // async matcherSubtitleGet() {
    //     throw new MusixmatchError(501);
    // }
    // async trackingUrlGet() {
    //     throw new MusixmatchError(501);
    // }

    // async catalogueDumpGet() {
    //     throw new MusixmatchError(501);
    // }

    // async workPost() {
    //     throw new MusixmatchError(501);
    // }

    // async workValidityPost() {
    //     throw new MusixmatchError(501);
    // }
}

export default MusixmatchClient;
