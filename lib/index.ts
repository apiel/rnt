import { writeFile } from 'fs';
import { promisify, isArray } from 'util';
import { dirname } from 'path';
import * as mkdirp from 'mkdirp';
import { get as getStack } from 'stack-trace';
import { launch } from 'puppeteer';

const defaultBaseUrl: string = process.env.RNT_BASE_URL || 'http://localhost:3000';

export interface DataUrl {
    pathUrl: string;
    data: any;
}

export async function loadUrls(
    dataUrls: DataUrl[],
    baseUrl: string = defaultBaseUrl,
): Promise<void> {
    const stack = getStack();
    const testFile =
        stack.map(item => item.getFileName())
             .find(file => file && file.indexOf('.test.e2e.') !== -1); // make this configurable
    for (const dataUrl of dataUrls) {
        const file = `${__dirname}/../data/${dataUrl.pathUrl}`;
        // console.log('file', file);
        await saveData(dataUrl, baseUrl, testFile, file);
        // await loadPage(dataUrl, baseUrl, file);
    }
}

async function saveData(
    dataUrl: DataUrl,
    baseUrl: string,
    testFile: string,
    file: string,
) {
    await promisify(mkdirp)(dirname(file));
    await promisify(writeFile)(
        `${file}.data`,
        JSON.stringify({ dataUrl, baseUrl, testFile }, null, 4),
    );
}

// async function loadPage(dataUrl: DataUrl, baseUrl: string, file: string) {
//     const browser = await launch({
//         // headless: false,
//     });
//     const page = await browser.newPage();
//     try {
//         await page.goto(`${baseUrl}${dataUrl.pathUrl}`, {
//             waitUntil: 'networkidle2',
//             timeout: 3000,
//         });
//         // await page.screenshot({path: `${file}.png`});
//         const html = await page.content();
//         await promisify(writeFile)(file, html);
//     } catch (error) {
//         console.log('ERR', error); // should do something with that
//     }

//     await browser.close();
// }
