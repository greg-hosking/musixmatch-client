const Genre = require("./genre");

class Track {
    constructor(
        {
            track_id,
            track_name,
            track_name_translation_list,
            track_rating,
            commontrack_id,
            instrumental,
            explicit,
            has_lyrics,
            has_subtitles,
            has_richsync,
            num_favourite,
            album_id,
            album_name,
            artist_id,
            artist_name,
            track_share_url,
            track_edit_url,
            restricted,
            updated_time,
            primary_genres,
            secondary_genres,
        } = {},
        getAlbumFn,
        getArtistFn,
        getLyricsFn,
        getLyricsMoodFn,
        getSnippetFn
    ) {
        if (!track_id && !commontrack_id) {
            throw new Error(
                "(Track.constructor) Missing required parameter(s): track_id or commontrack_id"
            );
        }
        if (
            typeof getAlbumFn !== "function" ||
            typeof getArtistFn !== "function" ||
            typeof getLyricsFn !== "function" ||
            typeof getLyricsMoodFn !== "function" ||
            typeof getSnippetFn !== "function"
        ) {
            throw new Error(
                "(Track.constructor) Missing required parameter(s): getAlbumFn, getArtistFn, getLyricsFn, getLyricsMoodFn, or getSnippetFn"
            );
        }

        this.id = track_id;
        this.name = track_name;
        this.nameTranslations = track_name_translation_list
            ?.filter((item) => item.track_name_translation)
            .map((item) => {
                return {
                    language: item.track_name_translation?.language ?? "",
                    translation: item.track_name_translation?.translation ?? "",
                };
            });
        this.rating = track_rating;
        this.isInstrumental = instrumental;
        this.isExplicit = explicit;
        this.hasLyrics = has_lyrics;
        this.hasSubtitles = has_subtitles;
        this.hasRichSync = has_richsync;
        this.favoriteCount = num_favourite;
        this.albumId = album_id;
        this.albumName = album_name;
        this.artistId = artist_id;
        this.artistName = artist_name;
        this.trackShareUrl = track_share_url;
        this.trackEditUrl = track_edit_url;
        this.isRestricted = restricted;
        this.updatedTime = updated_time;
        this.primaryGenres =
            primary_genres?.music_genre_list
                ?.filter((item) => item.music_genre)
                .map((item) => new Genre(item.music_genre)) ?? [];
        this.secondaryGenres =
            secondary_genres?.music_genre_list
                ?.filter((item) => item.music_genre)
                .map((item) => new Genre(item.music_genre)) ?? [];
        this.getAlbum = getAlbumFn;
        this.getArtist = getArtistFn;
        this.getLyrics = getLyricsFn;
        this.getLyricsMood = getLyricsMoodFn;
        this.getSnippet = getSnippetFn;
    }
}

module.exports = Track;
