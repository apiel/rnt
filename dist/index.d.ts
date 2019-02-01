export interface Config {
    baseUrl: string;
}
export interface DataUrl {
    pathUrl: string;
    data: any;
}
export declare function loadUrls(dataUrls: DataUrl[], baseUrl?: string): Promise<void>;
export declare function execJest(dataUrl: DataUrl, baseUrl: string, testFile: string, dataFile: string): Promise<void>;
