export interface IArticle {
    readonly id?: number;
    body: string;
    slug: string;
    title: string;
    reads: number;
    userId: number;
    liked?: boolean;
    summary: string;
    active?: boolean;
    featured?: boolean;
    createdAt?: string;
    updatedAt?: string;
    images: string[] | null;
    tags: string[] | null;
}
