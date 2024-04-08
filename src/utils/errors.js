class MusixmatchError extends Error {
    constructor(code, message = "") {
        if (!message) {
            switch (code) {
                case 400:
                    message =
                        "Bad request. The syntax was incorrect, or the request couldn't be satisfied.";
                    break;
                case 401:
                    message = "Authentication failed. Check your API key.";
                    break;
                case 402:
                    message =
                        "Usage limit reached. Check your daily request limits or balance.";
                    break;
                case 403:
                    message =
                        "Forbidden. You do not have access to this resource.";
                    break;
                case 404:
                    message =
                        "Resource not found. The requested item doesn't exist.";
                    break;
                case 405:
                    message =
                        "Method not allowed. The requested method is not supported for this endpoint.";
                    break;
                case 500:
                    message =
                        "Server error. Something went wrong with the system.";
                    break;
                case 501:
                    message =
                        "Not implemented. The requested method is not available.";
                    break;
                case 503:
                    message =
                        "Service unavailable. The system is busy. Please try again later.";
                    break;
                default:
                    message = "An unknown error occured. Please try again.";
                    break;
            }
        }
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }

    toString() {
        return `${this.name} ${this.code}: ${this.message}`;
    }
}

module.exports = MusixmatchError;
