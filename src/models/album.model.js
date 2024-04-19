const Genre = require("./genre.model");

class Album {
    constructor(
        {
            album_id,
            album_mbid,
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
        } = {},
        getArtistFn,
        getTracksFn
    ) {
        if (!album_id && !album_mbid) {
            throw new Error(
                "(Album.constructor) Missing required parameter(s): album_id or album_mbid"
            );
        }
        if (
            !getArtistFn ||
            typeof getArtistFn !== "function" ||
            !getTracksFn ||
            typeof getTracksFn !== "function"
        ) {
            throw new Error(
                "(Album.constructor) Missing required parameter(s): getArtistFn or getTracksFn"
            );
        }

        this.id = album_id;
        this.musicbrainzId = album_mbid;
        this.name = album_name;
        this.rating = album_rating;
        this.trackCount = album_track_count;
        this.releaseDate = album_release_date;
        this.releaseType = album_release_type;
        this.artistId = artist_id;
        this.artistName = artist_name;
        this.primaryGenres =
            primary_genres?.music_genre_list
                ?.filter((item) => item.music_genre)
                .map((item) => new Genre(item.music_genre)) ?? [];
        this.secondaryGenres =
            secondary_genres?.music_genre_list
                ?.filter((item) => item.music_genre)
                .map((item) => new Genre(item.music_genre)) ?? [];
        this.pline = album_pline;
        this.copyright = album_copyright;
        this.label = album_label;
        this.isRestricted = restricted;
        this.updatedTime = updated_time;
        this.externalIds = external_ids
            ? {
                  spotify: external_ids.spotify || [],
                  itunes: external_ids.itunes || [],
                  amazonMusic: external_ids.amazon_music || [],
              }
            : {};
        this.getArtist = getArtistFn;
        this.getTracks = getTracksFn;
    }
}

module.exports = Album;
