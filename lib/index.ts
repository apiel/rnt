import { writeFile } from 'fs';
import { promisify } from 'util';
import { dirname } from 'path';
import * as mkdirp from 'mkdirp';

const defaultBaseUrl: string = process.env.BASE_URL || 'http://localhost:3000';

export interface DataUrl {
    pathUrl: string;
    data: any;
}

export function loadUrls(
    dataUrls: DataUrl[],
    baseUrl: string = defaultBaseUrl,
): Promise<void[]> {
    const actions = dataUrls.map(
        async (dataUrl: DataUrl, index: number) => {
            await saveData(dataUrl, baseUrl);
        });
    return Promise.all(actions);
}

async function saveData(dataUrl: DataUrl, baseUrl: string) {
    const file = `${__dirname}/../data/${dataUrl.pathUrl}`;
    await promisify(mkdirp)(dirname(file));
    await promisify(writeFile)(
        `${file}.data`,
        JSON.stringify({ dataUrl, baseUrl }, null, 4),
    );
}
