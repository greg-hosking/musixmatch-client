export class MusixmatchError extends Error {
    code: number;
    static readonly errorCodeMessages: { [code: number]: string } = {
        400: "Bad request. The syntax was incorrect, or the request couldn't be satisfied.",
        401: "Authentication failed. Check your API key.",
        402: "Usage limit reached. Check your daily request limits or balance.",
        403: "Forbidden. You do not have access to this resource.",
        404: "Resource not found. The requested item doesn't exist.",
        405: "Method not allowed. The requested method is not supported for this endpoint.",
        500: "Server error. Something went wrong with the system.",
        501: "Not implemented. The requested method is not available.",
        503: "Service unavailable. The system is busy. Please try again later.",
    };

    constructor(code: number, message?: string) {
        if (!message) {
            message =
                MusixmatchError.errorCodeMessages[code] ||
                "An unknown error occurred. Please try again.";
        }
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }

    toString(): string {
        return `${this.name} ${this.code}: ${this.message}`;
    }
}
