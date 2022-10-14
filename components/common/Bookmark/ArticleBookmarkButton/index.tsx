import React, { FC, useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BsBookmarkPlus } from 'react-icons/bs';
import { RiBookmark3Fill } from 'react-icons/ri';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
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
        if (allUserBookmarks?.rows) {
            setBookmarkOwner(isAllArticleBookmarkOwner(slug, user.id, allUserBookmarks.rows));
        }
    }, [allUserBookmarks, slug, user.id]);

    const bookmarkArticle = (): void => {
        dispatch(addArticleBookmarkAction(slug)).then((res) => {
            if (res.type === 'bookmarks/add/rejected') message.error(getPayload(res.payload)?.message);
            else if (res.type === 'bookmarks/add/fulfilled') {
                dispatch(getUserBookmarksAction());
                dispatch(getArticleBookmarksAction(slug));
                message.success(t('bookmarkingSuccess'));
            }
        });
    };

    const unBookmarkArticle = (): void => {
        dispatch(removeArticleBookmarkAction(slug)).then((res) => {
            if (res.type === 'bookmarks/delete/rejected') message.error(getPayload(res.payload)?.message);
            else if (res.type === 'bookmarks/delete/fulfilled') {
                dispatch(getUserBookmarksAction());
                dispatch(getArticleBookmarksAction(slug));
                message.success(t('unBookmarkingSuccess'));
            }
        });
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
