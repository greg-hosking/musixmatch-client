const { DEFAULTS } = require("../constants");

class Artist {
    constructor(
        {
            artist_id,
            artist_mbid,
            artist_name,
            artist_name_translation_list,
            artist_country,
            artist_alias_list,
            artist_rating,
            updated_time,
        } = {},
        albumService,
        artistService
    ) {
        if (!artist_id && !artist_mbid) {
            throw new Error(
                "(Artist.constructor) Missing required parameter(s): artist_id or artist_mbid"
            );
        }
        if (!albumService || !artistService) {
            throw new Error(
                "(Artist.constructor) Missing required parameter(s): albumService or artistService"
            );
        }

        this.id = artist_id;
        this.musicbrainzId = artist_mbid;
        this.name = artist_name;
        this.nameTranslations =
            artist_name_translation_list
                ?.filter((item) => item.artist_name_translation)
                .map((item) => {
                    return {
                        language: item.artist_name_translation?.language ?? "",
                        translation:
                            item.artist_name_translation?.translation ?? "",
                    };
                }) ?? [];
        this.country = artist_country;
        this.aliases =
            artist_alias_list?.map((item) => {
                return item?.artist_alias ?? "";
            }) ?? [];
        this.rating = artist_rating;
        this.updatedTime = updated_time;

        this.albumService = albumService;
        this.artistService = artistService;
    }

    async getAlbums({
        groupByAlbumName = true,
        sortByReleaseDate = "desc",
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.albumService.getAlbumsByArtistId({
            id: this.id,
            musicbrainzId: this.musicbrainzId,
            groupByAlbumName,
            sortByReleaseDate,
            page,
            pageSize,
        });
    }

    async getRelatedArtists({
        page = DEFAULTS.PAGE,
        pageSize = DEFAULTS.PAGE_SIZE,
    } = {}) {
        return await this.artistService.getRelatedArtistsByArtistId({
            id: this.id,
            musicbrainzId: this.musicbrainzId,
            page,
            pageSize,
        });
    }
}

module.exports = Artist;
