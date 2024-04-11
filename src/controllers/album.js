const { DEFAULTS } = require("../constants");
const { Album } = require("../models");
const {
    musixmatchFetch,
    MusixmatchValidator,
    MusixmatchError,
} = require("../utils");

class AlbumController {
    static generateGetTracksFn({ apiKey, id, musicbrainzId } = {}) {
        return async function ({
            hasLyrics,
            page = DEFAULTS.PAGE,
            pageSize = DEFAULTS.PAGE_SIZE,
        } = {}) {
            return await AlbumController.getTracksByAlbumId({
                apiKey,
                id,
                musicbrainzId,
                hasLyrics,
                page,
                pageSize,
            });
        };
    }

    static async getAlbumById({ apiKey, id } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            const data = await musixmatchFetch({
                endpoint: "album.get",
                params: {
                    apikey: apiKey,
                    album_id: id,
                },
            });
            const album = data?.message?.body?.album
                ? new Album(data.message.body.album)
                : null;
            return album;
        } catch (error) {
            console.error(`(AlbumController.getAlbumById) ${error}`);
            return null;
        }
    }

    static async getTracksByAlbumId({
        apiKey,
        id,
        musicbrainzId,
        hasLyrics,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (!id && !musicbrainzId) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): id or musicbrainzId"
                );
            }
            // TO DO...
        } catch (error) {
            console.error(`(AlbumController.getTracksByAlbumId) ${error}`);
            return [];
        }
    }
}

module.exports = AlbumController;
