"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
const mkdirp = require("mkdirp");
const defaultBaseUrl = process.env.BASE_URL || 'http://localhost:3000';
function loadUrls(dataUrls, baseUrl = defaultBaseUrl) {
    const actions = dataUrls.map((dataUrl, index) => __awaiter(this, void 0, void 0, function* () {
        const file = `${__dirname}/../data/${dataUrl.pathUrl}`;
        yield util_1.promisify(mkdirp)(path_1.dirname(file));
        yield util_1.promisify(fs_1.writeFile)(`${file}.data`, JSON.stringify({ dataUrl, baseUrl }, null, 4));
    }));
    return Promise.all(actions);
}
exports.loadUrls = loadUrls;
//# sourceMappingURL=index.js.map