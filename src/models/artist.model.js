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
        getAlbumsFn,
        getRelatedArtistsFn
    ) {
        if (!artist_id && !artist_mbid) {
            throw new Error(
                "(Artist.constructor) Missing required parameter(s): artist_id or artist_mbid"
            );
        }
        if (
            !getAlbumsFn ||
            typeof getAlbumsFn !== "function" ||
            !getRelatedArtistsFn ||
            typeof getRelatedArtistsFn !== "function"
        ) {
            throw new Error(
                "(Artist.constructor) Missing required parameter(s): getAlbumsFn or getRelatedArtistsFn"
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

        this.getAlbums = getAlbumsFn;
        this.getRelatedArtists = getRelatedArtistsFn;
    }
}

module.exports = Artist;
