const { Genre } = require("../models");
const { musixmatchFetch } = require("../utils");

class GenreService {
    constructor(apiKey) {
        this.API_KEY = apiKey;
    }

    async getAllGenres() {
        try {
            const data = await musixmatchFetch({
                endpoint: "music.genres.get",
                params: {
                    apikey: this.API_KEY,
                },
            });
            const genres =
                data?.message?.body?.music_genre_list
                    ?.filter((item) => item.music_genre)
                    .map((item) => new Genre(item.music_genre)) ?? [];
            return genres;
        } catch (error) {
            console.error(`(GenreService.getAllGenres) ${error}`);
            return [];
        }
    }
}

module.exports = GenreService;
