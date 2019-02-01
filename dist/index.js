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
const findUp = require("find-up");
const child_process_1 = require("child_process");
const _debug = require("debug");
const debug = _debug('rnt');
debug(`Hello`);
const defaultConfig = {
    baseUrl: 'http://localhost:3000',
};
function getJestFile(cwd) {
    return findUp(['jest-e2e.config.js'], { cwd });
}
function loadConfig(cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield findUp(['rend-and-test.config.js'], { cwd });
        if (file) {
            return require(file);
        }
        return defaultConfig;
    });
}
function loadUrls(dataUrls, baseUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const stack = stack_trace_1.get();
        const testFile = stack.map(item => item.getFileName())
            .find(file => file && file.indexOf('.test.e2e.') !== -1);
        const config = yield loadConfig(testFile);
        baseUrl = baseUrl || config.baseUrl;
        for (const dataUrl of dataUrls) {
            const file = `${__dirname}/../data/${dataUrl.pathUrl}`;
            yield saveData(dataUrl, baseUrl, testFile, file);
            yield execJest(dataUrl, baseUrl, testFile, file);
        }
    });
}
exports.loadUrls = loadUrls;
function saveData(dataUrl, baseUrl, testFile, dataFile) {
    return __awaiter(this, void 0, void 0, function* () {
        yield util_1.promisify(mkdirp)(path_1.dirname(dataFile));
        yield util_1.promisify(fs_1.writeFile)(`${dataFile}.data`, JSON.stringify({ dataUrl, baseUrl, testFile }, null, 4));
    });
}
function execJest(dataUrl, baseUrl, testFile, dataFile) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const configFile = yield getJestFile(testFile);
            const cmd = `jest -c ${configFile} ${testFile}`;
            debug(cmd);
            const result = yield util_1.promisify(child_process_1.exec)(cmd, {
                env: Object.assign({}, process.env, { RNT_PATH_URL: dataUrl.pathUrl }),
            });
            debug(`result ${JSON.stringify(result)}`);
        }
        catch (error) {
            debug(`error ${JSON.stringify(error)}`);
        }
    });
}
exports.execJest = execJest;
function run(prepareTest, pageTest) {
    if (!process.env.RNT_PATH_URL) {
        prepareTest();
        it('should do something ', () => undefined);
    }
    else {
        pageTest();
    }
}
exports.run = run;
//# sourceMappingURL=index.js.map