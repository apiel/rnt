import { writeFile } from 'fs';
import { promisify } from 'util';

export interface DataUrl {
    url: string;
    data: any;
}

export function loadUrls(dataUrls: DataUrl[]): Promise<void> {
    return promisify(writeFile)(
        '/home/alex/dev/node/render-and-test/data/yo.txt',
        JSON.stringify(dataUrls, null, 4),
    );
}
