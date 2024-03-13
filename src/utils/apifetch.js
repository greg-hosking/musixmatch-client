const ERRORS = require("../constants/errors");
const BASE_URL = "https://api.musixmatch.com/ws/1.1/";

async function apiFetch({ endpoint, params = {}, method = "GET" } = {}) {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `${BASE_URL}${endpoint}?${queryParams}`;

        const response = await fetch(url, { method });
        const data = await response.json();

        const code = data?.message?.header?.status_code;
        if (code !== 200) {
            throw new Error(
                ERRORS[code] || "An unknown error occured. Please try again."
            );
        }
        return data;
    } catch (error) {
        throw error; // Re-throw the error to allow the calling method to catch it.
    }
}

module.exports = apiFetch;
