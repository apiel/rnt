import { writeFile } from 'fs';
import { promisify, isArray } from 'util';
import { dirname } from 'path';
import * as mkdirp from 'mkdirp';
import { launch } from 'puppeteer';

const defaultBaseUrl: string = process.env.BASE_URL || 'http://localhost:3000';

export interface DataUrl {
    pathUrl: string;
    data: any;
}

export async function loadUrls(
    dataUrls: DataUrl[],
    baseUrl: string = defaultBaseUrl,
): Promise<void> {
    for (const dataUrl of dataUrls) {
        const file = `${__dirname}/../data/${dataUrl.pathUrl}`;
        await saveData(dataUrl, baseUrl, file);
        await loadPage(dataUrl, baseUrl, file);
    }
}

async function saveData(dataUrl: DataUrl, baseUrl: string, file: string) {
    await promisify(mkdirp)(dirname(file));
    await promisify(writeFile)(
        `${file}.data`,
        JSON.stringify({ dataUrl, baseUrl }, null, 4),
    );
}

async function loadPage(dataUrl: DataUrl, baseUrl: string, file: string) {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(`${baseUrl}${dataUrl.pathUrl}`);
    // await page.screenshot({path: `${file}.png`});

    await browser.close();
}
