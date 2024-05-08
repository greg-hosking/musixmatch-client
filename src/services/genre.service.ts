import { GenreModel } from "../models";
import { GenreListApiResponse } from "../types/genre.types";
import { MusixmatchError } from "../utils";
import Service from "./service";

class GenreService extends Service {
    async getAllGenres(): Promise<GenreModel[]> {
        try {
            const data: GenreListApiResponse = await this.fetch({
                endpoint: "music.genres.get",
            });
            if (!data.message.body.music_genre_list) {
                throw new MusixmatchError(
                    500,
                    "Expected music_genre_list is not present in the response."
                );
            }
            const genres =
                data.message.body.music_genre_list.map(
                    (item) => new GenreModel(item.music_genre)
                ) ?? [];
            return genres;
        } catch (error) {
            console.error(`(GenreService.getAllGenres) ${error}`);
            return [];
        }
    }
}

export default GenreService;
