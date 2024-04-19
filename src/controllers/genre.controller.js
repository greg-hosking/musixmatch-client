const { Genre } = require("../models");
const { musixmatchFetch, MusixmatchValidator } = require("../utils");

class GenreController {
    static async getAllGenres({ apiKey } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            const data = await musixmatchFetch({
                endpoint: "music.genres.get",
                params: {
                    apikey: apiKey,
                },
            });
            const genres =
                data?.message?.body?.music_genre_list
                    ?.filter((item) => item.music_genre)
                    .map((item) => new Genre(item.music_genre)) ?? [];
            return genres;
        } catch (error) {
            console.error(`(GenreController.getAllGenres) ${error}`);
            return [];
        }
    }
}

module.exports = GenreController;
