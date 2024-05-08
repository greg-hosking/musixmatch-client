// const { DEFAULTS } = require("../constants");
// const { Album } = require("../models");
// const {
//     musixmatchFetch,
//     MusixmatchValidator,
//     MusixmatchError,
// } = require("../utils");

import Service from "./service";

// class AlbumService {
//     constructor(apiKey) {
//         this.API_KEY = apiKey;
//     }

//     setArtistService(artistService) {
//         this.artistService = artistService;
//     }

//     setTrackService(trackService) {
//         this.trackService = trackService;
//     }

//     async getAlbumById({ id } = {}) {
//         try {
//             const data = await musixmatchFetch({
//                 endpoint: "album.get",
//                 params: {
//                     apikey: this.API_KEY,
//                     album_id: id,
//                 },
//             });
//             const album = data?.message?.body?.album
//                 ? new Album(
//                       data.message.body.album,
//                       this.artistService,
//                       this.trackService
//                   )
//                 : null;
//             return album;
//         } catch (error) {
//             console.error(`(AlbumService.getAlbumById) ${error}`);
//             return null;
//         }
//     }

//     async getAlbumsByArtistId({
//         id,
//         musicbrainzId,
//         groupByAlbumName = true,
//         sortByReleaseDate = "desc",
//         page = DEFAULTS.PAGE,
//         pageSize = DEFAULTS.PAGE_SIZE,
//     } = {}) {
//         const self = this;
//         try {
//             if (!id && !musicbrainzId) {
//                 throw new MusixmatchError(
//                     400,
//                     "Missing required parameter(s): id or musicbrainzId"
//                 );
//             }
//             if (typeof groupByAlbumName !== "boolean") {
//                 throw new MusixmatchError(
//                     400,
//                     "Invalid parameter: groupByAlbumName. The value must be a boolean."
//                 );
//             }
//             if (
//                 typeof sortByReleaseDate !== "string" ||
//                 !["asc", "desc"].includes(sortByReleaseDate)
//             ) {
//                 throw new MusixmatchError(
//                     400,
//                     `Invalid parameter: sortByReleaseDate. The value must be either "asc" or "desc".`
//                 );
//             }
//             MusixmatchValidator.validatePage(page);
//             MusixmatchValidator.validatePageSize(pageSize);

//             let params = {
//                 apikey: this.API_KEY,
//                 page: page,
//                 page_size: pageSize,
//             };
//             if (id) {
//                 params.artist_id = id;
//             } else if (musicbrainzId) {
//                 params.mbid = musicbrainzId;
//             }
//             params.g_album_name = groupByAlbumName;
//             params.s_release_date = sortByReleaseDate;

//             const data = await musixmatchFetch({
//                 endpoint: "artist.albums.get",
//                 params: params,
//             });
//             const albums =
//                 data?.message?.body.album_list
//                     ?.filter((item) => item.album)
//                     .map((item) => {
//                         return new Album(
//                             item.album,
//                             self.artistService,
//                             self.trackService
//                         );
//                     }) ?? [];
//             return albums;
//         } catch (error) {
//             console.error(`(AlbumService.getAlbumsByArtistId) ${error}`);
//             return [];
//         }
//     }
// }

// module.exports = AlbumService;

class AlbumService extends Service {}

export default AlbumService;
