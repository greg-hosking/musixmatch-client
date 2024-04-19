const { DEFAULTS } = require("../constants");
const { AlbumController, ArtistController } = require(".");
const { Lyrics, Snippet, Track } = require("../models");
const {
    musixmatchFetch,
    MusixmatchValidator,
    MusixmatchError,
} = require("../utils");

class TrackController {
    static generateGetLyricsFn({ apiKey, id, commonTrackId } = {}) {
        return async function () {
            return await TrackController.getLyricsByTrackId({
                apiKey,
                id,
                commonTrackId,
            });
        };
    }

    static generateGetLyricsMoodFn({ apiKey, commonTrackId } = {}) {
        return async function () {
            return await TrackController.getLyricsMoodByTrackId({
                apiKey,
                commonTrackId,
            });
        };
    }

    static generateGetSnippetFn({ apiKey, id } = {}) {
        return async function () {
            return await TrackController.getSnippetByTrackId({
                apiKey,
                id,
            });
        };
    }

    static async getChartingTracks({} = {}) {
        // ...
    }

    static async search({} = {}) {
        // ...
    }

    static async getTrackByCommonTrackId({
        apiKey,
        commonTrackId,
        trackIsrc,
    } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (!commonTrackId && !trackIsrc) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): commonTrackId or trackIsrc"
                );
            }

            const params = { apikey: apiKey };
            if (commonTrackId) {
                params.commontrack_id = commonTrackId;
            } else if (trackIsrc) {
                params.track_isrc = trackIsrc;
            }

            const data = await musixmatchFetch({
                endpoint: "track.get",
                params: params,
            });
            if (!data?.message?.body?.track) {
                return null;
            }
            const trackData = data.message.body.track;
            return new Track(
                trackData,
                AlbumController.getAlbumById({
                    apiKey: apiKey,
                    id: trackData.album_id,
                }),
                ArtistController.getArtistById({
                    apiKey: apiKey,
                    id: trackData.artist_id,
                }),
                TrackController.generateGetLyricsFn({
                    apiKey: apiKey,
                    id: trackData.track_id,
                    commonTrackId: trackData.commontrack_id,
                }),
                TrackController.generateGetLyricsMoodFn({
                    apiKey: apiKey,
                    commonTrackId: trackData.commontrack_id,
                }),
                TrackController.generateGetSnippetFn({
                    apiKey: apiKey,
                    id: trackData.track_id,
                })
            );
        } catch (error) {
            console.error(`(TrackController.getTrackByCommonTrackId) ${error}`);
            return null;
        }
    }

    static async getLyricsByTrackId({ apiKey, id, commonTrackId } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (!id && !commonTrackId) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): id or commonTrackId"
                );
            }

            const params = { apikey: apiKey };
            if (id) {
                params.track_isrc = id;
            } else if (commonTrackId) {
                params.commontrack_id = commonTrackId;
            }

            const data = await musixmatchFetch({
                endpoint: "track.lyrics.get",
                params: params,
            });
            if (!data?.message?.body?.lyrics) {
                return null;
            }
            return new Lyrics(data.message.body.lyrics);
        } catch (error) {
            console.error(`(TrackController.getLyricsByTrackId) ${error}`);
            return null;
        }
    }

    static async getLyricsMoodByTrackId({
        apiKey,
        commonTrackId,
        trackIsrc,
    } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (!commonTrackId && !trackIsrc) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): commonTrackId or trackIsrc"
                );
            }

            const params = { apikey: apiKey };
            if (commonTrackId) {
                params.commontrack_id = commonTrackId;
            } else if (trackIsrc) {
                params.track_isrc = trackIsrc;
            }

            const data = await musixmatchFetch({
                endpoint: "track.lyrics.mood.get",
                params: params,
            });
            if (
                !data?.message?.body?.mood_list ||
                !data?.message?.body?.raw_data
            ) {
                return null;
            }
            const processed = {};
            data.message.body.mood_list.forEach((mood) => {
                processed[mood.label] = mood.value;
            });
            return {
                processed: processed,
                raw: data.message.body.raw_data,
            };
        } catch (error) {
            console.error(`(TrackController.getLyricsMoodByTrackId) ${error}`);
            return null;
        }
    }

    static async getSnippetByTrackId({ apiKey, id } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (!id) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter: id"
                );
            }

            const data = await musixmatchFetch({
                endpoint: "track.snippet.get",
                params: {
                    apikey: apiKey,
                    track_id: id,
                },
            });
            if (!data?.message?.body?.snippet) {
                return null;
            }
            return new Snippet(data.message.body.snippet);
        } catch (error) {
            console.error(`(TrackController.getSnippetByTrackId) ${error}`);
            return null;
        }
    }

    static async getMatchingTrack({
        apiKey,
        trackName,
        artistName,
        albumName,
    } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (
                typeof trackName !== "string" &&
                typeof artistName !== "string" &&
                typeof albumName !== "string"
            ) {
                throw new MusixmatchError(
                    400,
                    "Missing or invalid required parameter(s): trackName, artistName, or albumName (at least one required)"
                );
            }

            const params = { apikey: apiKey };
            if (trackName) {
                params.q_track = trackName;
            }
            if (artistName) {
                params.q_artist = artistName;
            }
            if (albumName) {
                params.q_album = albumName;
            }

            const data = await musixmatchFetch({
                endpoint: "matcher.track.get",
                params: params,
            });
            if (!data?.message?.body?.track) {
                return null;
            }
            const trackData = data.message.body.track;
            return new Track(
                trackData,
                AlbumController.getAlbumById({
                    apiKey: apiKey,
                    id: trackData.album_id,
                }),
                ArtistController.getArtistById({
                    apiKey: apiKey,
                    id: trackData.artist_id,
                }),
                TrackController.generateGetLyricsFn({
                    apiKey: apiKey,
                    id: trackData.track_id,
                    commonTrackId: trackData.commontrack_id,
                }),
                TrackController.generateGetLyricsMoodFn({
                    apiKey: apiKey,
                    commonTrackId: trackData.commontrack_id,
                }),
                TrackController.generateGetSnippetFn({
                    apiKey: apiKey,
                    id: trackData.track_id,
                })
            );
        } catch (error) {
            console.error(`(TrackController.getMatchingTrack) ${error}`);
            return null;
        }
    }

    static async getMatchingTrackLyrics({
        apiKey,
        trackName,
        artistName,
        trackIsrc,
    } = {}) {
        try {
            MusixmatchValidator.validateApiKey(apiKey);
            if (
                typeof trackName !== "string" ||
                typeof artistName !== "string"
            ) {
                throw new MusixmatchError(
                    400,
                    "Missing or invalid required parameter(s): trackName or artistName"
                );
            }

            const params = {
                apikey: apiKey,
                q_track: trackName,
                q_artist: artistName,
            };
            if (trackIsrc) {
                params.track_isrc = trackIsrc;
            }

            const data = await musixmatchFetch({
                endpoint: "matcher.lyrics.get",
                params: params,
            });
            if (!data?.message?.body?.lyrics) {
                return null;
            }
            return new Lyrics(data.message.body.lyrics);
        } catch (error) {
            console.error(`(TrackController.getMatchingTrackLyrics) ${error}`);
            return null;
        }
    }
}

module.exports = TrackController;
