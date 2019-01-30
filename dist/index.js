"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const defaultBaseUrl = process.env.BASE_URL || 'http://localhost:3000';
function loadUrls(dataUrls, baseUrl = defaultBaseUrl) {
    return util_1.promisify(fs_1.writeFile)(`${__dirname}/../data/yo.txt`, JSON.stringify({ dataUrls, baseUrl }, null, 4));
}
exports.loadUrls = loadUrls;
//# sourceMappingURL=index.js.map