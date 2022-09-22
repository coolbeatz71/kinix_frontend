export interface IAdsData {
    id?: number;
    legend: string;
    title: string;
    subTitle: string;
    body: string;
    redirectUrl?: string | null;
    image: string | null;
}
export interface IStoryData {
    id?: number;
    legend: string;
    title: string;
    subTitle: string;
    body: string;
    redirectUrl?: string | null;
    media: string | null | undefined;
    mediaType: string | null | undefined;
}
