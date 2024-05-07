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
