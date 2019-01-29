"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
function loadUrls(dataUrls) {
    return util_1.promisify(fs_1.writeFile)('/home/alex/dev/node/render-and-test/data/yo.txt', JSON.stringify(dataUrls, null, 4));
}
exports.loadUrls = loadUrls;
//# sourceMappingURL=index.js.map