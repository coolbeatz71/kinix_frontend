export interface IVideo {
    readonly id?: number;
    slug: string;
    link: string;
    title: string;
    userId: number;
    lyrics?: string;
    active?: boolean;
    avgRate?: number;
    shared?: boolean;
    categoryId: number;
    createdAt?: string;
    updatedAt?: string;
    totalRaters?: number;
    tags: string[] | null;
}
