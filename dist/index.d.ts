export interface DataUrl {
    url: string;
    data: any;
}
export declare function loadUrls(dataUrls: DataUrl[]): Promise<void>;
