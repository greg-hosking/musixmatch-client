// import { Chart, Country } from "../enums";
// import MusixmatchError from "./errors";

// class MusixmatchValidator {
//     static validateChart(chart: string): void {
//         if (!(chart in Chart)) {
//             throw new MusixmatchError(
//                 400,
//                 `Invalid chart: ${chart}. Check MusixmatchClient.CHARTS for valid charts.`
//             );
//         }
//     }

//     static validateCountry(country: string): void {
//         if (!(country in Country)) {
//             throw new MusixmatchError(
//                 400,
//                 `Invalid country: ${country}. Check MusixmatchClient.COUNTRIES for valid countries.`
//             );
//         }
//     }

//     static validatePage(page: number): void {
//         if (!Number.isInteger(page) || page < 1) {
//             throw new MusixmatchError(
//                 400,
//                 `Invalid page: ${page}. The page must be a positive integer.`
//             );
//         }
//     }

//     static validatePageSize(pageSize: number): void {
//         if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
//             throw new MusixmatchError(
//                 400,
//                 `Invalid page size: ${pageSize}. The page size must be an integer between 1 and 100.`
//             );
//         }
//     }
// }

// // Exporting using ES6 syntax
// export default MusixmatchValidator;
