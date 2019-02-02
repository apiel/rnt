import { writeFile, rename } from 'fs';
import { promisify, isArray } from 'util';
import { dirname, basename } from 'path';
import * as mkdirp from 'mkdirp';
import { get as getStack } from 'stack-trace';
import * as findUp from 'find-up';
import { exec } from 'child_process';
import * as _debug from 'debug';
import * as md5 from 'md5';
import { tmpdir } from 'os';

const debug = _debug('rnt');

export interface Config {
    baseUrl: string;
}

const defaultConfig: Config = {
    baseUrl: 'http://0.0.0.0:3000',
};

function getJestFile(cwd: string) {
    return findUp(['jest-e2e.config.js'], { cwd });
}

async function loadConfig(cwd: string): Promise<Config> {
    const file = await findUp(['rend-and-test.config.js'], { cwd }); // might need to have other format
    if (file) {
        return require(file);
    }
    return defaultConfig;
}

export interface DataUrl {
    pathUrl: string;
    data: any;
}

export async function loadUrls(
    dataUrls: DataUrl[],
    baseUrl?: string,
): Promise<void> {
    const stack = getStack();
    const testFile =
        stack.map(item => item.getFileName())
             .find(file => file && file.indexOf('.test.e2e.') !== -1); // make this configurable
    const config = await loadConfig(testFile);
    baseUrl = baseUrl || config.baseUrl;
    for (const dataUrl of dataUrls) {
        const file = `${__dirname}/../data/${dataUrl.pathUrl}`;
        // await saveData(dataUrl, baseUrl, testFile, file);
        await execJest(dataUrl, baseUrl, testFile, file);
    }
}

// async function saveData(
//     dataUrl: DataUrl,
//     baseUrl: string,
//     testFile: string,
//     dataFile: string,
// ) {
//     await promisify(mkdirp)(dirname(dataFile));
//     await promisify(writeFile)(
//         `${dataFile}.data`,
//         JSON.stringify({ dataUrl, baseUrl, testFile }, null, 4),
//     );
// }

export async function page(pageToSave: any) {
    const file = process.env.RNT_FILE;
    debug(`tmp html file: ${file}`);
    const html = await pageToSave.content();
    await promisify(writeFile)(
        file,
        html,
    );
}

async function savePage(
    tmpFile: string,
    { pathUrl }: DataUrl,
) {
    const newPath = `/home/alex/dev/test/e2e/render-and-test/example/pages/${pathUrl}`;
    await promisify(mkdirp)(dirname(newPath));
    await promisify(rename)(tmpFile, newPath);
}

export async function execJest(
    dataUrl: DataUrl,
    baseUrl: string,
    testFile: string,
    dataFile: string,
) {
    // try {
        const configFile = await getJestFile(testFile);
        const cmd = `jest -c ${configFile} ${testFile}`;
        debug(cmd);
        const RNT_FILE = `${tmpdir()}/RNT_${md5(dataUrl.pathUrl)}`;
        const result = await promisify(exec)(cmd, {
            env: {
                ...process.env,
                RNT_DATA_URL: JSON.stringify({ ...dataUrl, baseUrl }),
                RNT_FILE,
            },
        });
        debug(`result ${JSON.stringify(result)}`);
        await savePage(RNT_FILE, dataUrl);
    // } catch (error) {
    //     debug(`error ${JSON.stringify(error)}`);
    // }
}

export function run(prepareTest: any, pageTest: any) {
    if (process.env.RNT_DATA_URL) {
        const dataUrl = JSON.parse(process.env.RNT_DATA_URL); // : DataUrl
        pageTest(dataUrl);
    } else {
        prepareTest();
        it('should do something ', () => undefined);
    }
}
