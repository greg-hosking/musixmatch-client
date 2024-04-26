export type ApiResponseHeader = {
    status_code: number;
    execute_time: number;
    available?: number;
};

export type ApiResponse<T> = {
    message: {
        header: ApiResponseHeader;
        body: T;
    };
};

export type Genre = {
    music_genre_id?: number;
    music_genre_parent_id?: number;
    music_genre_name?: string;
    music_genre_name_extended?: string;
    music_genre_vanity?: string;
};

export type GenreListApiResponse = ApiResponse<{
    music_genre_list: Array<{ music_genre: Genre }>;
}>;
