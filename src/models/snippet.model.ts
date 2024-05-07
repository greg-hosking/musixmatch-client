import { Snippet } from "../types/snippet.type";

class SnippetModel {
    language?: string;
    isRestricted?: boolean;
    isInstrumental?: boolean;
    body?: string;
    scriptTrackingUrl?: string;
    pixelTrackingUrl?: string;
    htmlTrackingUrl?: string;
    updatedTime?: string;

    constructor({
        snippet_language,
        restricted,
        instrumental,
        snippet_body,
        script_tracking_url,
        pixel_tracking_url,
        html_tracking_url,
        updated_time,
    }: Snippet = {}) {
        this.language = snippet_language;
        this.isRestricted = Boolean(restricted);
        this.isInstrumental = Boolean(instrumental);
        this.body = snippet_body;
        this.scriptTrackingUrl = script_tracking_url;
        this.pixelTrackingUrl = pixel_tracking_url;
        this.htmlTrackingUrl = html_tracking_url;
        this.updatedTime = updated_time;
    }
}

export default SnippetModel;
