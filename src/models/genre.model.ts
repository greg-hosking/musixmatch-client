import { Genre } from "../types/api.types";

class GenreModel {
    id?: number;
    parentId?: number;
    name?: string;
    nameExtended?: string;
    vanity?: string;

    constructor({
        music_genre_id,
        music_genre_parent_id,
        music_genre_name,
        music_genre_name_extended,
        music_genre_vanity,
    }: Genre = {}) {
        this.id = music_genre_id;
        this.parentId = music_genre_parent_id;
        this.name = music_genre_name;
        this.nameExtended = music_genre_name_extended;
        this.vanity = music_genre_vanity;
    }
}

export default GenreModel;
