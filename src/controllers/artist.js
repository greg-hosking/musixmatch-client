const { DEFAULTS } = require("../constants");
const { AlbumController } = require("../controllers");
const { Album, Artist } = require("../models");
const {
    MusixmatchError,
    musixmatchFetch,
    MusixmatchValidator,
} = require("../utils");

class ArtistController {
    static generateGetAlbumsFn({ apiKey, id, musicbrainzId } = {}) {
        return async function ({
            groupByAlbumName,
            sortByReleaseDate,
            page = DEFAULTS.PAGE,
            pageSize = DEFAULTS.PAGE_SIZE,
        } = {}) {
            return await ArtistController.getAlbumsByArtistId({
                apiKey,
                id,
                musicbrainzId,
                groupByAlbumName,
                sortByReleaseDate,
                page,
                pageSize,
            });
        };
    }

    static generateGetRelatedArtistsFn({ apiKey, id, musicbrainzId } = {}) {
        return async function ({
            page = DEFAULTS.PAGE,
            pageSize = DEFAULTS.PAGE_SIZE,
        } = {}) {
            return await ArtistController.getRelatedArtistsByArtistId({
                apiKey,
                id,
                musicbrainzId,
                page,
                pageSize,
            });
        };
    }

    static generateGetAlbumArtistFn({ apiKey, id, musicbrainzId } = {}) {
        return async function ({
            page = DEFAULTS.PAGE,
            pageSize = DEFAULTS.PAGE_SIZE,
        } = {}) {
            return await ArtistController.getArtistById({
                apiKey,
                id,
                musicbrainzId,
                page,
                pageSize,
            });
        };
    }

    static async getArtistById({ apiKey, id, musicbrainzId } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (!id && !musicbrainzId) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): id or musicbrainzId"
                );
            }

            let params = { apikey: apiKey };
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
            const artistData = data.message.body.artist;
            const options = {
                apiKey,
                id: artistData.artist_id,
                musicbrainzId: artistData.artist_mbid,
            };
            return new Artist(
                artistData,
                ArtistController.generateGetAlbumsFn(options),
                ArtistController.generateGetRelatedArtistsFn(options)
            );
        } catch (error) {
            console.error(`(ArtistController.getArtistById) ${error}`);
            return null;
        }
    }

    static async getAlbumsByArtistId({
        apiKey,
        id,
        musicbrainzId,
        groupByAlbumName = true,
        sortByReleaseDate = "desc",
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (!id && !musicbrainzId) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): id or musicbrainzId"
                );
            }
            if (typeof groupByAlbumName !== "boolean") {
                throw new MusixmatchError(
                    400,
                    "Invalid parameter: groupByAlbumName. The value must be a boolean."
                );
            }
            if (
                typeof sortByReleaseDate !== "string" ||
                !["asc", "desc"].includes(sortByReleaseDate)
            ) {
                throw new MusixmatchError(
                    400,
                    `Invalid parameter: sortByReleaseDate. The value must be either "asc" or "desc".`
                );
            }
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            let params = { apikey: apiKey, page: page, page_size: pageSize };
            if (id) {
                params.artist_id = id;
            } else if (musicbrainzId) {
                params.mbid = musicbrainzId;
            }
            params.g_album_name = groupByAlbumName;
            params.s_release_date = sortByReleaseDate;

            const data = await musixmatchFetch({
                endpoint: "artist.albums.get",
                params: params,
            });
            const albums =
                data?.message?.body.album_list
                    ?.filter((item) => item.album)
                    .map((item) => {
                        return new Album(
                            item.album,
                            ArtistController.generateGetAlbumArtistFn({
                                apiKey,
                                id: item.album.artist_id,
                                musicbrainzId: item.album.artist_mbid,
                            }),
                            AlbumController.generateGetTracksFn({
                                apiKey,
                                id: item.album.album_id,
                                musicbrainzId: item.album.album_mbid,
                            })
                        );
                    }) ?? [];
            return albums;
        } catch (error) {
            console.error(`(Artist.getAlbumsByArtistId) ${error}`);
            return [];
        }
    }

    static async getRelatedArtistsByArtistId({
        apiKey,
        id,
        musicbrainzId,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (!id && !musicbrainzId) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): id or musicbrainzId"
                );
            }
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            let params = { apikey: apiKey, page: page, page_size: pageSize };
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
                        const artistData = item.artist;
                        const options = {
                            apiKey,
                            id: artistData.artist_id,
                            musicbrainzId: artistData.artist_mbid,
                        };
                        return new Artist(
                            artistData,
                            ArtistController.generateGetAlbumsFn(options),
                            ArtistController.generateGetRelatedArtistsFn(
                                options
                            )
                        );
                    }) ?? [];
            return artists;
        } catch (error) {
            console.error(
                `(ArtistController.getRelatedArtistsByArtistId) ${error}`
            );
            return [];
        }
    }

    static async getChartingArtists({
        apiKey,
        country = DEFAULTS.COUNTRY,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            MusixmatchValidator.validateCountry(country);
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            const data = await musixmatchFetch({
                endpoint: "chart.artists.get",
                params: {
                    apikey: apiKey,
                    country,
                    page,
                    page_size: pageSize,
                },
            });
            const artists =
                data?.message?.body?.artist_list
                    ?.filter((item) => item.artist)
                    .map((item) => {
                        const artistData = item.artist;
                        const options = {
                            apiKey,
                            id: artistData.artist_id,
                            musicbrainzId: artistData.artist_mbid,
                        };
                        return new Artist(
                            artistData,
                            ArtistController.generateGetAlbumsFn(options),
                            ArtistController.generateGetRelatedArtistsFn(
                                options
                            )
                        );
                    }) ?? [];
            return artists;
        } catch (error) {
            console.error(`(ArtistController.getChartingArtists) ${error}`);
            return [];
        }
    }

    static async search({
        apiKey,
        artistName,
        idFilter,
        musicbrainzIdFilter,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    }) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (typeof artistName !== "string") {
                throw new MusixmatchError(
                    400,
                    "Missing or invalid required parameter: artistName"
                );
            }
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            let params = {
                apikey: apiKey,
                q_artist: artistName,
                page,
                page_size: pageSize,
            };
            if (idFilter) {
                params.f_artist_id = idFilter;
            }
            if (musicbrainzIdFilter) {
                params.f_artist_mbid = musicbrainzIdFilter;
            }

            const data = await musixmatchFetch({
                endpoint: "artist.search",
                params,
            });
            const artists =
                data?.message?.body?.artist_list
                    ?.filter((item) => item.artist)
                    .map((item) => {
                        const artistData = item.artist;
                        const options = {
                            apiKey,
                            id: artistData.artist_id,
                            musicbrainzId: artistData.artist_mbid,
                        };
                        return new Artist(
                            artistData,
                            ArtistController.generateGetAlbumsFn(options),
                            ArtistController.generateGetRelatedArtistsFn(
                                options
                            )
                        );
                    }) ?? [];
            return artists;
        } catch (error) {
            console.error(`(ArtistController.search) ${error}`);
            return [];
        }
    }
}

module.exports = ArtistController;
