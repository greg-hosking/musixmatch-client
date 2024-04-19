const { DEFAULTS } = require("../constants");
const { Lyrics, Snippet, Track } = require("../models");
const {
    musixmatchFetch,
    MusixmatchValidator,
    MusixmatchError,
} = require("../utils");

class TrackService {
    constructor(apiKey) {
        this.API_KEY = apiKey;
    }

    setAlbumService(albumService) {
        this.albumService = albumService;
    }

    setArtistService(artistService) {
        this.artistService = artistService;
    }

    async getChartingTracks({
        chart = DEFAULTS.CHART,
        country = DEFAULTS.COUNTRY,
        hasLyrics,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        const self = this;
        try {
            MusixmatchValidator.validateChart(chart);
            MusixmatchValidator.validateCountry(country);
            if (
                typeof hasLyrics !== "undefined" &&
                typeof hasLyrics !== "boolean"
            ) {
                throw new MusixmatchError(
                    400,
                    "Invalid parameter: hasLyrics. The value must be a boolean."
                );
            }
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            const params = {
                apikey: this.API_KEY,
                chart_name: chart,
                country,
                page,
                page_size: pageSize,
            };
            if (typeof hasLyrics === "boolean") {
                params.f_has_lyrics = hasLyrics;
            }

            const data = await musixmatchFetch({
                endpoint: "chart.tracks.get",
                params,
            });
            const tracks =
                data?.message?.body?.track_list
                    ?.filter((item) => item.track)
                    .map((item) => {
                        return new Track(
                            item.track,
                            self.albumService,
                            self.artistService,
                            self
                        );
                    }) ?? [];
            return tracks;
        } catch (error) {
            console.error(`(TrackService.getChartingTracks) ${error}`);
        }
    }

    async getLyricsByTrackId({ id, commontrackId } = {}) {
        try {
            if (!id && !commontrackId) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): id or commontrackId"
                );
            }

            const params = { apikey: this.API_KEY };
            if (id) {
                params.track_id = id;
            } else if (commontrackId) {
                params.commontrack_id = commontrackId;
            }

            const data = await musixmatchFetch({
                endpoint: "track.lyrics.get",
                params,
            });
            if (!data?.message?.body?.lyrics) {
                return null;
            }
            return new Lyrics(data.message.body.lyrics);
        } catch (error) {
            console.error(`(TrackService.getLyricsByTrackId) ${error}`);
            return null;
        }
    }

    async getLyricsMoodByTrackId({ commontrackId, trackIsrc } = {}) {
        try {
            if (!commontrackId && !trackIsrc) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): commontrackId or trackIsrc"
                );
            }

            const params = { apikey: this.API_KEY };
            if (commontrackId) {
                params.commontrack_id = commontrackId;
            } else if (trackIsrc) {
                params.track_isrc = trackIsrc;
            }

            const data = await musixmatchFetch({
                endpoint: "track.lyrics.mood.get",
                params,
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
            console.error(`(TrackService.getLyricsMoodByTrackId) ${error}`);
            return null;
        }
    }

    async getMatchingTrack({ trackQuery, artistQuery, albumQuery } = {}) {
        const self = this;
        try {
            if (
                typeof trackQuery !== "string" &&
                typeof artistQuery !== "string" &&
                typeof albumQuery !== "string"
            ) {
                throw new MusixmatchError(
                    400,
                    "Missing or invalid required parameter(s): trackQuery, artistQuery, or albumQuery (at least one required)"
                );
            }

            const params = { apikey: this.API_KEY };
            if (trackQuery) {
                params.q_track = trackQuery;
            }
            if (artistQuery) {
                params.q_artist = artistQuery;
            }
            if (albumQuery) {
                params.q_album = albumQuery;
            }

            const data = await musixmatchFetch({
                endpoint: "matcher.track.get",
                params,
            });
            if (!data?.message?.body?.track) {
                return null;
            }
            return new Track(
                data.message.body.track,
                self.albumService,
                self.artistService,
                self
            );
        } catch (error) {
            console.error(`(TrackService.getMatchingTrack) ${error}`);
            return null;
        }
    }

    async getMatchingTrackLyrics({ trackQuery, artistQuery, trackIsrc } = {}) {
        try {
            if (
                typeof trackQuery !== "string" ||
                typeof artistQuery !== "string"
            ) {
                throw new MusixmatchError(
                    400,
                    "Missing or invalid required parameter(s): trackQuery or artistQuery"
                );
            }

            const params = {
                apikey: this.API_KEY,
                q_track: trackQuery,
                q_artist: artistQuery,
            };
            if (trackIsrc) {
                params.track_isrc = trackIsrc;
            }

            const data = await musixmatchFetch({
                endpoint: "matcher.lyrics.get",
                params,
            });
            if (!data?.message?.body?.lyrics) {
                return null;
            }
            return new Lyrics(data.message.body.lyrics);
        } catch (error) {
            console.error(`(TrackService.getMatchingTrackLyrics) ${error}`);
            return null;
        }
    }

    async getSnippetByTrackId({ id } = {}) {
        try {
            if (!id) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter: id"
                );
            }

            const data = await musixmatchFetch({
                endpoint: "track.snippet.get",
                params: {
                    apikey: this.API_KEY,
                    track_id: id,
                },
            });
            if (!data?.message?.body?.snippet) {
                return null;
            }
            return new Snippet(data.message.body.snippet);
        } catch (error) {
            console.error(`(TrackService.getSnippetByTrackId) ${error}`);
            return null;
        }
    }

    async getTrackByCommontrackId({ commontrackId, trackIsrc } = {}) {
        const self = this;
        try {
            if (!commontrackId && !trackIsrc) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): commontrackId or trackIsrc"
                );
            }

            const params = { apikey: this.API_KEY };
            if (commontrackId) {
                params.commontrack_id = commontrackId;
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
            return new Track(
                data.message.body.track,
                self.albumService,
                self.artistService,
                self
            );
        } catch (error) {
            console.error(`(TrackService.getTrackByCommontrackId) ${error}`);
            return null;
        }
    }

    async getTracksByAlbumId({
        id,
        musicbrainzId,
        hasLyrics,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        const self = this;
        try {
            if (!id && !musicbrainzId) {
                throw new MusixmatchError(
                    400,
                    "Missing required parameter(s): id or musicbrainzId"
                );
            }
            if (
                typeof hasLyrics !== "undefined" &&
                typeof hasLyrics !== "boolean"
            ) {
                throw new MusixmatchError(
                    400,
                    "Invalid parameter: hasLyrics. The value must be a boolean."
                );
            }
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            const params = {
                apikey: this.API_KEY,
                page,
                page_size: pageSize,
            };
            if (id) {
                params.album_id = id;
            } else if (musicbrainzId) {
                params.album_mbid = musicbrainzId;
            }
            if (typeof hasLyrics === "boolean") {
                params.f_has_lyrics = hasLyrics;
            }

            const data = await musixmatchFetch({
                endpoint: "album.tracks.get",
                params,
            });
            const tracks =
                data?.message?.body?.track_list
                    ?.filter((item) => item.track)
                    .map((item) => {
                        return new Track(
                            item.track,
                            self.albumService,
                            self.artistService,
                            self
                        );
                    }) ?? [];
            return tracks;
        } catch (error) {
            console.error(`(TrackService.getTracksByAlbumId) ${error}`);
            return [];
        }
    }

    async searchTracks({
        trackQuery,
        artistQuery,
        lyricsQuery,
        trackArtistQuery,
        writerQuery,
        query,
        artistId,
        musicGenreId,
        lyricsLanguage,
        hasLyrics,
        minReleaseDate,
        maxReleaseDate,
        sortByArtistRating,
        sortByTrackRating,
        quorumFactor,
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        const self = this;
        try {
            if (
                typeof trackQuery !== "string" &&
                typeof artistQuery !== "string" &&
                typeof lyricsQuery !== "string" &&
                typeof trackArtistQuery !== "string" &&
                typeof writerQuery !== "string" &&
                typeof query !== "string"
            ) {
                throw new MusixmatchError(
                    400,
                    "Missing or invalid required parameter(s): trackQuery, artistQuery, lyricsQuery, trackArtistQuery, writerQuery, or query (at least one required)"
                );
            }
            MusixmatchValidator.validatePage(page);
            MusixmatchValidator.validatePageSize(pageSize);

            const params = { apikey: this.API_KEY, page, page_size: pageSize };
            if (typeof trackQuery !== "undefined") {
                params.q_track = trackQuery;
            }
            if (typeof artistQuery !== "undefined") {
                params.q_artist = artistQuery;
            }
            if (typeof lyricsQuery !== "undefined") {
                params.q_lyrics = lyricsQuery;
            }
            if (typeof trackArtistQuery !== "undefined") {
                params.q_track_artist = trackArtistQuery;
            }
            if (typeof writerQuery !== "undefined") {
                params.q_writer = writerQuery;
            }
            if (typeof query !== "undefined") {
                params.q = query;
            }
            if (typeof artistId !== "undefined") {
                params.f_artist_id = artistId;
            }
            if (typeof musicGenreId !== "undefined") {
                params.f_music_genre_id = musicGenreId;
            }
            if (typeof lyricsLanguage !== "undefined") {
                params.f_lyrics_language = lyricsLanguage;
            }
            if (typeof hasLyrics !== "undefined") {
                params.f_has_lyrics = hasLyrics;
            }
            if (typeof minReleaseDate !== "undefined") {
                params.f_track_release_group_first_release_date_min =
                    minReleaseDate;
            }
            if (typeof maxReleaseDate !== "undefined") {
                params.f_track_release_group_first_release_date_max =
                    maxReleaseDate;
            }
            if (typeof sortByArtistRating !== "undefined") {
                params.s_artist_rating = sortByArtistRating;
            }
            if (typeof sortByTrackRating !== "undefined") {
                params.s_track_rating = sortByTrackRating;
            }
            if (typeof quorumFactor !== "undefined") {
                params.quorum_factor = quorumFactor;
            }

            const data = await musixmatchFetch({
                endpoint: "track.search",
                params,
            });
            const tracks =
                data?.message?.body?.track_list
                    ?.filter((item) => item.track)
                    .map((item) => {
                        return new Track(
                            item.track,
                            self.albumService,
                            self.artistService,
                            self
                        );
                    }) ?? [];
            return tracks;
        } catch (error) {
            console.error(`(TrackService.searchTracks) ${error}`);
            return [];
        }
    }
}

module.exports = TrackService;
