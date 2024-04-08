const { musixmatchFetch, MusixmatchValidator } = require("../utils");

class Genre {
    static async getAllGenres({ apiKey } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            const data = await musixmatchFetch({
                endpoint: "music.genres.get",
                params: {
                    apikey: apiKey,
                },
            });
            const genres = data.message.body.music_genre_list.map((item) => {
                return new Genre(item.music_genre);
            });
            return genres;
        } catch (error) {
            console.error(`(Genre.getAllGenres) ${error}`);
            return [];
        }
    }

    constructor({
        music_genre_id,
        music_genre_parent_id,
        music_genre_name,
        music_genre_name_extended,
        music_genre_vanity,
    } = {}) {
        this.id = music_genre_id;
        this.parentId = music_genre_parent_id;
        this.name = music_genre_name;
        this.nameExtended = music_genre_name_extended;
        this.vanity = music_genre_vanity;
    }
}

module.exports = Genre;
