import { ApiResponse } from "./api.types";

export type Lyrics = {
    lyrics_id?: number;
    restricted?: boolean;
    instrumental?: boolean;
    lyrics_body?: string;
    lyrics_language?: string;
    script_tracking_url?: string;
    pixel_tracking_url?: string;
    lyrics_copyright?: string;
    backlink_url?: string;
    updated_time?: string;
};

export type LyricsApiResponse = ApiResponse<{ lyrics: Lyrics }>;

export type LyricsMood = {
    label: string;
    value: number;
};

export type LyricsMoodRawData = {
    valence: number;
    arousal: number;
};

export type LyricsMoodApiResponse = ApiResponse<{
    mood_list: LyricsMood[];
    raw_data: LyricsMoodRawData;
}>;
