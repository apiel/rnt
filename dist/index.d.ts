export interface Config {
    baseUrl: string;
    dist: string;
}
export interface DataUrl {
    pathUrl: string;
    data: any;
}
export declare function loadUrls(dataUrls: DataUrl[], baseUrl?: string): Promise<void>;
export declare function setPage(page: any): Promise<void>;
export declare function execJest(dataUrl: DataUrl, baseUrl: string, testFile: string, config: Config): Promise<void>;
export declare function run(prepareTest: any, pageTest: any): void;
export declare function auditBeforeRender(page: any): Promise<any>;
export declare function audit(page: any): Promise<any>;
