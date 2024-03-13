const ERRORS = Object.freeze({
    200: "200 The request was successful.",
    400: "400 Bad request. The syntax was incorrect, or the request couldn't be satisfied.",
    401: "401 Authentication failed. Check your API key.",
    402: "402 Usage limit reached. Check your daily request limits or balance.",
    403: "403 Unauthorized operation. You do not have permission to perform this action.",
    404: "404 Resource not found. The requested item doesn't exist.",
    405: "405 Method not found. The requested method is not supported for this endpoint.",
    500: "500 Server error. Something went wrong with the system.",
    503: "503 Service unavailable. The system is busy. Please try again later.",

    INVALID_CHART: "400 Invalid chart. Check Client.CHARTS for valid charts.",
    INVALID_COUNTRY:
        "400 Invalid country. Check Client.COUNTRIES for valid countries.",
    INVALID_PAGE: "400 Invalid page. The page must be a positive integer.",
    INVALID_PAGE_SIZE:
        "400 Invalid page size. The page size must be an integer between 1 and 100.",
});

module.exports = ERRORS;
