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
const puppeteer_1 = require("puppeteer");
const defaultBaseUrl = process.env.BASE_URL || 'http://localhost:3000';
function loadUrls(dataUrls, baseUrl = defaultBaseUrl) {
    const actions = dataUrls.map((dataUrl, index) => __awaiter(this, void 0, void 0, function* () {
        const file = `${__dirname}/../data/${dataUrl.pathUrl}`;
        yield saveData(dataUrl, baseUrl, file);
        yield loadPage(dataUrl, baseUrl, file);
    }));
    return Promise.all(actions);
}
exports.loadUrls = loadUrls;
function saveData(dataUrl, baseUrl, file) {
    return __awaiter(this, void 0, void 0, function* () {
        yield util_1.promisify(mkdirp)(path_1.dirname(file));
        yield util_1.promisify(fs_1.writeFile)(`${file}.data`, JSON.stringify({ dataUrl, baseUrl }, null, 4));
    });
}
function loadPage(dataUrl, baseUrl, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.launch();
        const page = yield browser.newPage();
        yield page.goto(`${baseUrl}${dataUrl.pathUrl}`);
        yield page.screenshot({ path: `${file}.png` });
        yield browser.close();
    });
}
//# sourceMappingURL=index.js.map