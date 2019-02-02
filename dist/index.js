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
const md5 = require("md5");
const os_1 = require("os");
const debug = _debug('rnt');
const defaultConfig = {
    baseUrl: 'http://0.0.0.0:3000',
    dist: 'pages/',
};
function getRootDir(cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        const pkgFile = yield findUp('package.json', { cwd });
        return path_1.dirname(pkgFile);
    });
}
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
            yield execJest(dataUrl, baseUrl, testFile, config);
        }
    });
}
exports.loadUrls = loadUrls;
function page(pageToSave) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = process.env.RNT_FILE;
        debug(`tmp html file: ${file}`);
        const html = yield pageToSave.content();
        yield util_1.promisify(fs_1.writeFile)(file, html);
    });
}
exports.page = page;
function savePage(tmpFile, { pathUrl }, config, testFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const rootDir = yield getRootDir(testFile);
        const newPath = path_1.join(rootDir, config.dist, pathUrl);
        yield util_1.promisify(mkdirp)(path_1.dirname(newPath));
        yield util_1.promisify(fs_1.rename)(tmpFile, newPath);
    });
}
function execJest(dataUrl, baseUrl, testFile, config) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const configFile = yield getJestFile(testFile);
            const cmd = `jest -c ${configFile} ${testFile}`;
            debug(cmd);
            const RNT_FILE = `${os_1.tmpdir()}/RNT_${md5(dataUrl.pathUrl)}`;
            const result = yield util_1.promisify(child_process_1.exec)(cmd, {
                env: Object.assign({}, process.env, { RNT_DATA_URL: JSON.stringify(Object.assign({}, dataUrl, { baseUrl })), RNT_FILE }),
            });
            debug(`result ${JSON.stringify(result)}`);
            yield savePage(RNT_FILE, dataUrl, config, testFile);
        }
        catch (error) {
            debug(`error ${JSON.stringify(error)}`);
        }
    });
}
exports.execJest = execJest;
function run(prepareTest, pageTest) {
    if (process.env.RNT_DATA_URL) {
        const dataUrl = JSON.parse(process.env.RNT_DATA_URL);
        pageTest(dataUrl);
    }
    else {
        prepareTest();
        it('should do something ', () => undefined);
    }
}
exports.run = run;
//# sourceMappingURL=index.js.map