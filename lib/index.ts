import { writeFile } from 'fs';
import { promisify } from 'util';

const defaultBaseUrl: string = process.env.BASE_URL || 'http://localhost:3000';

export interface DataUrl {
    pathUrl: string;
    data: any;
}

export function loadUrls(
    dataUrls: DataUrl[],
    baseUrl: string = defaultBaseUrl,
): Promise<void> {
    return promisify(writeFile)(
        `${__dirname}/../data/yo.txt`,
        JSON.stringify({ dataUrls, baseUrl }, null, 4),
    );
}
