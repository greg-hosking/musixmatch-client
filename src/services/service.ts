import { FetchFunction } from "../types/common";

class Service {
    fetch: FetchFunction;

    constructor(fetch: FetchFunction) {
        this.fetch = fetch;
    }
}

export default Service;
