const Genre = require("./genre");
const { musixmatchFetch, MusixmatchValidator } = require("../utils");

class Track {
    static async getById({ apiKey, commonTrackId, trackIsrc } = {}) {
        // ...
    }

    static async search({} = {}) {
        // ...
    }

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
        apiKey
    ) {
        // TO DO: Implement constructor
    }
}

module.exports = Track;
