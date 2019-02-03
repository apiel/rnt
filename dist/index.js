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
const lighthouse = require("lighthouse");
const url_1 = require("url");
const express = require("express");
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
function setPage(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = process.env.RNT_FILE;
        debug(`tmp html file: ${file}`);
        const html = yield page.content();
        yield util_1.promisify(fs_1.writeFile)(file, html);
    });
}
exports.setPage = setPage;
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
        const configFile = yield getJestFile(testFile);
        const cmd = `jest -c ${configFile} ${testFile}`;
        debug(cmd);
        const RNT_FILE = `${os_1.tmpdir()}/RNT_${md5(dataUrl.pathUrl)}`;
        const result = yield util_1.promisify(child_process_1.exec)(cmd, {
            env: Object.assign({}, process.env, { RNT_DATA_URL: JSON.stringify(Object.assign({}, dataUrl, { baseUrl })), RNT_FILE }),
        });
        debug(`result ${JSON.stringify(result)}`);
        yield savePage(RNT_FILE, dataUrl, config, testFile);
    });
}
exports.execJest = execJest;
function getDataUrl() {
    return JSON.parse(process.env.RNT_DATA_URL);
}
function run(prepareTest, pageTest) {
    if (process.env.RNT_DATA_URL) {
        const dataUrl = getDataUrl();
        pageTest(dataUrl);
    }
    else {
        prepareTest();
        it('should do something ', () => undefined);
    }
}
exports.run = run;
function auditBeforeRender(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = page.browser();
        const url = page.url();
        const { lhr } = yield lighthouse(url, {
            port: (new url_1.URL(browser.wsEndpoint())).port,
            output: 'json',
            logLevel: 'error',
        });
        return lhr;
    });
}
exports.auditBeforeRender = auditBeforeRender;
function audit(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const port = 3001;
        const app = express();
        const html = yield page.content();
        const dataUrl = getDataUrl();
        app.get(dataUrl.pathUrl, (req, res) => res.send(html));
        const server = app.listen(port);
        const browser = page.browser();
        const url = `http://127.0.0.1:${port}${dataUrl.pathUrl}`;
        const { lhr } = yield lighthouse(url, {
            port: (new url_1.URL(browser.wsEndpoint())).port,
            output: 'json',
            logLevel: 'error',
        });
        server.close();
        yield util_1.promisify(fs_1.writeFile)('/home/alex/dev/test/e2e/render-and-test/audit.json', JSON.stringify(lhr, null, 4));
        return lhr;
    });
}
exports.audit = audit;
//# sourceMappingURL=index.js.map