class Snippet {
    constructor({
        snippet_language,
        restricted,
        instrumental,
        snippet_body,
        script_tracking_url,
        pixel_tracking_url,
        html_tracking_url,
        updated_time,
    } = {}) {
        this.language = snippet_language;
        this.isRestricted = restricted;
        this.isInstrumental = instrumental;
        this.body = snippet_body;
        this.scriptTrackingUrl = script_tracking_url;
        this.pixelTrackingUrl = pixel_tracking_url;
        this.htmlTrackingUrl = html_tracking_url;
        this.updatedTime = updated_time;
    }
}

module.exports = Snippet;
