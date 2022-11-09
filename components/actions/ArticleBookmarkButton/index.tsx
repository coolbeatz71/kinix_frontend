import { FC, useEffect, useState } from 'react';

import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BsBookmarkPlus } from 'react-icons/bs';
import { RiBookmark3Fill } from 'react-icons/ri';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import showAuthRequired from '@helpers/showAuthRequired';
import addArticleBookmarkAction from '@redux/bookmarks/add';
import getArticleBookmarksAction from '@redux/bookmarks/all';
import removeArticleBookmarkAction from '@redux/bookmarks/delete';
import getUserBookmarksAction from '@redux/bookmarks/userBookmarks';
import { isAllArticleBookmarkOwner } from '@helpers/isBookmarkOwner';

import styles from './index.module.scss';

export interface IArticleBookmarkButtonProps {
    slug: string;
}

const ArticleBookmarkButton: FC<IArticleBookmarkButtonProps> = ({ slug }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    const [bookmarkOwner, setBookmarkOwner] = useState<boolean | undefined>(false);

    const { data: user } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);
    const { data: allUserBookmarks } = useSelector(({ bookmarks: { user } }: IRootState) => user);

    useEffect(() => {
        if (allUserBookmarks?.rows && user?.id) {
            setBookmarkOwner(isAllArticleBookmarkOwner(slug, user?.id, allUserBookmarks.rows));
        }
    }, [allUserBookmarks, slug, user?.id]);

    const bookmarkArticle = (): void => {
        if (user?.id) {
            dispatch(addArticleBookmarkAction(slug)).then((res) => {
                if (res.type === 'bookmarks/add/rejected') message.error(getPayload(res)?.message);
                else if (res.type === 'bookmarks/add/fulfilled') {
                    dispatch(getUserBookmarksAction());
                    dispatch(getArticleBookmarksAction(slug));
                    message.success(getPayload(res).message);
                }
            });
        } else showAuthRequired(t, dispatch);
    };

    const unBookmarkArticle = (): void => {
        if (user?.id) {
            dispatch(removeArticleBookmarkAction(slug)).then((res) => {
                if (res.type === 'bookmarks/delete/rejected') message.error(getPayload(res)?.message);
                else if (res.type === 'bookmarks/delete/fulfilled') {
                    dispatch(getUserBookmarksAction());
                    dispatch(getArticleBookmarksAction(slug));
                    message.success(getPayload(res).message);
                }
            });
        } else showAuthRequired(t, dispatch);
    };

    return (
        <Button
            type="text"
            data-theme={value}
            className={styles.articleBookmarkButton}
            onClick={bookmarkOwner ? unBookmarkArticle : bookmarkArticle}
            icon={
                bookmarkOwner ? (
                    <RiBookmark3Fill className="anticon" data-bookmarked />
                ) : (
                    <BsBookmarkPlus className="anticon" />
                )
            }
        />
    );
};

export default ArticleBookmarkButton;
