const Genre = require("./genre.model");

class Track {
    constructor(
        {
            track_id,
            track_mbid,
            track_name,
            track_name_translation_list,
            track_rating,
            track_length,
            commontrack_id,
            instrumental,
            explicit,
            has_lyrics,
            lyrics_id,
            has_subtitles,
            subtitle_id,
            has_richsync,
            num_favourite,
            album_id,
            album_name,
            album_coverart_100x100,
            artist_id,
            artist_mbid,
            artist_name,
            track_share_url,
            track_edit_url,
            restricted,
            updated_time,
            primary_genres,
            secondary_genres,
        } = {},
        albumService,
        artistService,
        trackService
    ) {
        if (!track_id && !commontrack_id) {
            throw new Error(
                "(Track.constructor) Missing required parameter(s): track_id or commontrack_id"
            );
        }
        if (!albumService || !artistService || !trackService) {
            throw new Error(
                "(Track.constructor) Missing required parameter(s): albumService, artistService, or trackService"
            );
        }

        this.id = track_id;
        this.musicbrainzId = track_mbid;
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
        this.length = track_length;
        this.commontrackId = commontrack_id;
        this.isInstrumental = instrumental;
        this.isExplicit = explicit;
        this.hasLyrics = has_lyrics;
        this.lyricsId = lyrics_id;
        this.hasSubtitles = has_subtitles;
        this.subtitleId = subtitle_id;
        this.hasRichSync = has_richsync;
        this.favoriteCount = num_favourite;
        this.albumId = album_id;
        this.albumName = album_name;
        this.albumCoverart = album_coverart_100x100;
        this.artistId = artist_id;
        this.artistMusicbrainzId = artist_mbid;
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

        this.albumService = albumService;
        this.artistService = artistService;
        this.trackService = trackService;
    }

    async getAlbum() {
        return await this.albumService.getAlbumById({ id: this.albumId });
    }

    async getArtist() {
        return await this.artistService.getArtistById({ id: this.artistId });
    }

    async getLyrics() {
        return await this.trackService.getLyricsByTrackId({
            id: this.id,
            commontrackId: this.commontrackId,
        });
    }

    async getLyricsMood() {
        return await this.trackService.getLyricsMoodByTrackId({
            commontrackId: this.commontrackId,
        });
    }

    async getSnippet() {
        return await this.trackService.getSnippetByTrackId({ id: this.id });
    }
}

module.exports = Track;
