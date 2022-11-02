import { ILike } from '@interfaces/api';

const isSingleArticleLikeOwner = (userId: number | undefined, likes: ILike[] | []): boolean | undefined => {
    if (likes && userId) {
        const isOwner = likes?.some((like) => like.userId === userId);
        return isOwner;
    }
};

export const isAllArticleLikeOwner = (
    slug: string,
    userId: number | undefined,
    likes: ILike[] | [],
): boolean | undefined => {
    if (likes && userId) {
        const isOwner = likes?.some((like) => like.userId === userId && slug === like.article?.slug);
        return isOwner;
    }
};

export default isSingleArticleLikeOwner;
