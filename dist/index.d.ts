export interface DataUrl {
    pathUrl: string;
    data: any;
}
export declare function loadUrls(dataUrls: DataUrl[], baseUrl?: string): Promise<void[]>;
