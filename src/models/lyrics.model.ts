import { Lyrics } from "../types/lyrics.type";

class LyricsModel {
    id?: number;
    isRestricted?: boolean;
    isInstrumental?: boolean;
    body?: string;
    language?: string;
    scriptTrackingUrl?: string;
    pixelTrackingUrl?: string;
    copyright?: string;
    backlinkUrl?: string;
    updatedTime?: string;

    constructor({
        lyrics_id,
        restricted,
        instrumental,
        lyrics_body,
        lyrics_language,
        script_tracking_url,
        pixel_tracking_url,
        lyrics_copyright,
        backlink_url,
        updated_time,
    }: Lyrics = {}) {
        this.id = lyrics_id;
        this.isRestricted = restricted;
        this.isInstrumental = instrumental;
        this.body = lyrics_body;
        this.language = lyrics_language;
        this.scriptTrackingUrl = script_tracking_url;
        this.pixelTrackingUrl = pixel_tracking_url;
        this.copyright = lyrics_copyright;
        this.backlinkUrl = backlink_url;
        this.updatedTime = updated_time;
    }
}

export default LyricsModel;
