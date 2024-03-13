const apiFetch = require("../utils/apifetch");
const {
    validateCountry,
    validatePage,
    validatePageSize,
} = require("../utils/validations");

class Artist {
    static async getById(id) {
        // ...
    }

    static async getByMusicbrainzId(musicbrainzId) {
        // ...
    }

    static async getTopArtists({ apiKey, country, page, pageSize } = {}) {
        try {
            validateCountry(country);
            validatePage(page);
            validatePageSize(pageSize);

            const data = await apiFetch({
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
            console.error(`Artist.getTopArtists ${error}`);
            return [];
        }
    }

    static async search({}) {
        // ...
    }

    constructor({
        artist_id,
        artist_mbid,
        artist_name,
        artist_alias_list,
        artist_rating,
        updated_time,
    } = {}) {
        this.id = artist_id;
        this.musicbrainzId = artist_mbid;
        this.name = artist_name;
        this.aliases = artist_alias_list;
        this.rating = artist_rating;
        this.updatedTime = updated_time;
    }

    async getAlbums({}) {
        // ...
    }

    async getRelatedArtists({}) {
        // ...
    }
}

module.exports = Artist;
