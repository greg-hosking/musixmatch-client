import { Chart, Country } from "../enums";

export type Defaults = {
    chart: Chart;
    country: Country;
    page: number;
    pageSize: number;
};

export type DefaultOverrideOptions = {
    chart?: Chart;
    country?: Country;
    pageSize?: number;
};

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
