const Artist = require("./artist");
const Genre = require("./genre");

class Album {
    static async getById({ apiKey, id } = {}) {
        // ...
    }

    constructor({
        album_id,
        album_name,
        album_rating,
        album_track_count,
        album_release_date,
        album_release_type,
        artist_id,
        artist_name,
        primary_genres,
        secondary_genres,
        album_pline,
        album_copyright,
        album_label,
        restricted,
        updated_time,
        external_ids,
    } = {}) {
        this.id = album_id;
        this.name = album_name;
        this.rating = album_rating;
        this.trackCount = album_track_count;
        this.releaseDate = album_release_date;
        this.releaseType = album_release_type;
        this.artist = new Artist({ artist_id, artist_name });
        this.primaryGenres = primary_genres.music_genre_list.map((item) => {
            return new Genre(item.music_genre);
        });
        this.secondaryGenres = secondary_genres
            ? secondary_genres.music_genre_list.map((item) => {
                  return new Genre(item.music_genre);
              })
            : [];
        this.pline = album_pline;
        this.copyright = album_copyright;
        this.label = album_label;
        this.restricted = restricted;
        this.updatedTime = updated_time;
        this.externalIds = external_ids
            ? {
                  spotify: external_ids.spotify || [],
                  itunes: external_ids.itunes || [],
                  amazonMusic: external_ids.amazon_music || [],
              }
            : {};
    }

    async getTracks() {
        // ...
    }
}

module.exports = Album;
