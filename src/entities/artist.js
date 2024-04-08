const { DEFAULTS } = require("../constants");
const {
    MusixmatchError,
    musixmatchFetch,
    MusixmatchValidator,
} = require("../utils");

class Artist {
    static async getArtist({ apiKey, id, musicbrainzId } = {}) {
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
            return new Artist(data.message.body.artist);
        } catch (error) {
            console.error(`(Artist.getArtist) ${error}`);
            return null;
        }
    }

    static async getArtistAlbums({
        apiKey,
        id,
        musicbrainzId,
        groupByAlbumName,
        sortByReleaseDate,
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
            groupByAlbumName = MusixmatchValidator.validateBoolean(
                "groupByAlbumName",
                groupByAlbumName
            );
            sortByReleaseDate = MusixmatchValidator.validateOrder(
                "sortByReleaseDate",
                sortByReleaseDate
            );
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            let params = { apikey: apiKey, page: page, page_size: pageSize };
            if (id) {
                params.artist_id = id;
            } else if (musicbrainzId) {
                params.mbid = musicbrainzId;
            }
            if (typeof groupByAlbumName !== "undefined") {
                params.g_album_name = groupByAlbumName;
            }
            if (typeof sortByReleaseDate !== "undefined") {
                params.s_release_date = sortByReleaseDate;
            }

            const data = await musixmatchFetch({
                endpoint: "artist.albums.get",
                params: params,
            });
            const albums = data.message.album_list.map((item) => {
                return new Album(item.album);
            });
            return albums;
        } catch (error) {
            console.error(`(Artist.getArtistAlbums) ${error}`);
            return [];
        }
    }

    static async getRelatedArtists({
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
            const artists = data.message.body.artist_list.map(
                (item) => new Artist(item.artist)
            );
            return artists;
        } catch (error) {
            console.error(`(Artist.getRelatedArtists) ${error}`);
            return [];
        }
    }

    static async getTopArtists({
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
            const artists = data.message.body.artist_list.map(
                (item) => new Artist(item.artist)
            );
            return artists;
        } catch (error) {
            console.error(`(Artist.getTopArtists) ${error}`);
            return [];
        }
    }

    static async search({
        apiKey,
        query,
        idFilter,
        musicbrainzIdFilter,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    }) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (!query) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter: query"
                );
            }
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            let params = {
                apikey: apiKey,
                q_artist: query,
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
            const artists = data.message.body.artist_list.map(
                (item) => new Artist(item.artist)
            );
            return artists;
        } catch (error) {
            console.error(`(Artist.search) ${error}`);
            return [];
        }
    }

    constructor({
        artist_id,
        artist_mbid,
        artist_name,
        artist_name_translation_list,
        artist_country,
        artist_alias_list,
        artist_rating,
        updated_time,
    } = {}) {
        this.id = artist_id;
        this.musicbrainzId = artist_mbid;
        this.name = artist_name;
        this.nameTranslations = artist_name_translation_list.map((item) => {
            return {
                language: item.artist_name_translation.language,
                translation: item.artist_name_translation.translation,
            };
        });
        this.country = artist_country;
        this.aliases = artist_alias_list.map((item) => {
            return item.artist_alias;
        });
        this.rating = artist_rating;
        this.updatedTime = updated_time;
    }

    async getAlbums({
        apiKey,
        groupByAlbumName,
        sortByReleaseDate,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await Artist.getArtistAlbums({
            apiKey,
            id: this.id,
            musicbrainzId: this.musicbrainzId,
            groupByAlbumName,
            sortByReleaseDate,
            page,
            pageSize,
        });
    }

    async getRelatedArtists({
        apiKey,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await Artist.getRelatedArtists({
            apiKey,
            id: this.id,
            musicbrainzId: this.musicbrainzId,
            page,
            pageSize,
        });
    }
}

module.exports = Artist;
