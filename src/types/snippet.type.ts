import { ApiResponse } from "./api.types";

export type Snippet = {
    snippet_language?: string;
    restricted?: number;
    instrumental?: number;
    snippet_body?: string;
    script_tracking_url?: string;
    pixel_tracking_url?: string;
    html_tracking_url?: string;
    updated_time?: string;
};

export type SnippetApiResponse = ApiResponse<{ snippet: Snippet }>;
