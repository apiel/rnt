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
const stack_trace_1 = require("stack-trace");
const defaultBaseUrl = process.env.RNT_BASE_URL || 'http://localhost:3000';
function loadUrls(dataUrls, baseUrl = defaultBaseUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const stack = stack_trace_1.get();
        const testFile = stack.map(item => item.getFileName())
            .find(file => file && file.indexOf('.test.e2e.') !== -1);
        for (const dataUrl of dataUrls) {
            const file = `${__dirname}/../data/${dataUrl.pathUrl}`;
            yield saveData(dataUrl, baseUrl, testFile, file);
        }
    });
}
exports.loadUrls = loadUrls;
function saveData(dataUrl, baseUrl, testFile, file) {
    return __awaiter(this, void 0, void 0, function* () {
        yield util_1.promisify(mkdirp)(path_1.dirname(file));
        yield util_1.promisify(fs_1.writeFile)(`${file}.data`, JSON.stringify({ dataUrl, baseUrl, testFile }, null, 4));
    });
}
//# sourceMappingURL=index.js.map