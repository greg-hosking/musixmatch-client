import { Chart, Country } from "../enums";
import { MusixmatchError } from "../utils";

export type FetchOptions = {
    endpoint?: string;
    params?: Record<string, any>;
    method?: string;
};

export type FetchFunction = ({
    endpoint,
    params,
    method,
}: FetchOptions) => Promise<any>;

export type Defaults = {
    chart: Chart;
    country: Country;
    page: number;
    pageSize: number;
};

export type CreateErrorFunction = (
    code: number,
    message?: string
) => MusixmatchError;
