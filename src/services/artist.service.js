const { DEFAULTS } = require("../constants");
const { Artist } = require("../models");
const {
    MusixmatchError,
    musixmatchFetch,
    MusixmatchValidator,
} = require("../utils");

class ArtistService {
    constructor(apiKey) {
        this.API_KEY = apiKey;
    }

    setAlbumService(albumService) {
        this.albumService = albumService;
    }

    async getArtistById({ id, musicbrainzId } = {}) {
        try {
            if (!id && !musicbrainzId) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): id or musicbrainzId"
                );
            }

            let params = { apikey: this.API_KEY };
            if (id) {
                params.artist_id = id;
            } else if (musicbrainzId) {
                params.mbid = musicbrainzId;
            }

            const data = await musixmatchFetch({
                endpoint: "artist.get",
                params: params,
            });
            if (!data?.message?.body?.artist) {
                return null;
            }
            return new Artist(
                data.message.body.artist,
                this.albumService,
                this
            );
        } catch (error) {
            console.error(`(ArtistService.getArtistById) ${error}`);
            return null;
        }
    }

    async getChartingArtists({
        country = DEFAULTS.COUNTRY,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        const self = this;
        try {
            MusixmatchValidator.validateCountry(country);
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            const data = await musixmatchFetch({
                endpoint: "chart.artists.get",
                params: {
                    apikey: this.API_KEY,
                    country,
                    page,
                    page_size: pageSize,
                },
            });
            const artists =
                data?.message?.body?.artist_list
                    ?.filter((item) => item.artist)
                    .map((item) => {
                        return new Artist(item.artist, self.albumService, self);
                    }) ?? [];
            return artists;
        } catch (error) {
            console.error(`(ArtistService.getChartingArtists) ${error}`);
            return [];
        }
    }

    async getRelatedArtistsByArtistId({
        id,
        musicbrainzId,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        const self = this;
        try {
            if (!id && !musicbrainzId) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): id or musicbrainzId"
                );
            }
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            let params = {
                apikey: this.API_KEY,
                page: page,
                page_size: pageSize,
            };
            if (id) {
                params.artist_id = id;
            } else if (musicbrainzId) {
                params.mbid = musicbrainzId;
            }

            const data = await musixmatchFetch({
                endpoint: "artist.related.get",
                params: params,
            });
            const artists =
                data?.message?.body?.artist_list
                    ?.filter((item) => item.artist)
                    .map((item) => {
                        return new Artist(item.artist, self.albumService, self);
                    }) ?? [];
            return artists;
        } catch (error) {
            console.error(
                `(ArtistService.getRelatedArtistsByArtistId) ${error}`
            );
            return [];
        }
    }

    async searchArtists({
        artistQuery,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    }) {
        const self = this;
        try {
            if (typeof artistQuery !== "string") {
                throw new MusixmatchError(
                    400,
                    "Missing or invalid required parameter: artistQuery"
                );
            }
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            const data = await musixmatchFetch({
                endpoint: "artist.search",
                params: {
                    apikey: this.API_KEY,
                    q_artist: artistQuery,
                    page,
                    page_size: pageSize,
                },
            });
            const artists =
                data?.message?.body?.artist_list
                    ?.filter((item) => item.artist)
                    .map((item) => {
                        return new Artist(item.artist, self.albumService, self);
                    }) ?? [];
            return artists;
        } catch (error) {
            console.error(`(ArtistController.searchArtists) ${error}`);
            return [];
        }
    }
}

module.exports = ArtistService;
