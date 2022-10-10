import { IBookmark } from '@interfaces/api';

const isSingleArticleBookmarkOwner = (userId: number | undefined, bookmarks: IBookmark[] | []): boolean | undefined => {
    if (bookmarks && userId) {
        const isOwner = bookmarks?.some((bookmark) => bookmark.userId === userId);
        return isOwner;
    }
};

export const isAllArticleBookmarkOwner = (
    slug: string,
    userId: number | undefined,
    bookmarks: IBookmark[] | [],
): boolean | undefined => {
    if (bookmarks && userId) {
        const isOwner = bookmarks?.some((bookmark) => bookmark.userId === userId && slug === bookmark.article?.slug);
        return isOwner;
    }
};

export default isSingleArticleBookmarkOwner;
