const MusixmatchError = require("./errors");

const BASE_URL = "https://api.musixmatch.com/ws/1.1/";

async function musixmatchFetch({ endpoint, params = {}, method = "GET" } = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}?${queryParams}`;

    const response = await fetch(url, { method });
    const data = await response.json();

    const code = data?.message?.header?.status_code;
    if (code === 200) {
        return data;
    }
    throw new MusixmatchError(code);
}

module.exports = musixmatchFetch;
