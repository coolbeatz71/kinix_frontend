import { FC, useEffect, useState } from 'react';
import numeral from 'numeral';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BsBookmarkPlus } from 'react-icons/bs';
import { RiBookmark3Fill } from 'react-icons/ri';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import { CommentOutlined, HeartOutlined, HeartFilled } from 'icons';
import { IArticle } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import addArticleLikeAction from '@redux/likes/add';
import getArticleLikesAction from '@redux/likes/all';
import showAuthRequired from '@helpers/showAuthRequired';
import removeArticleLikeAction from '@redux/likes/unlike';
import addArticleBookmarkAction from '@redux/bookmarks/add';
import isSingleArticleLikeOwner from '@helpers/isLikeOwner';
import getArticleBookmarksAction from '@redux/bookmarks/all';
import getAllArticleCommentsAction from '@redux/comments/all';
import removeArticleBookmarkAction from '@redux/bookmarks/delete';
import isSingleArticleBookmarkOwner from '@helpers/isBookmarkOwner';
import getUserBookmarksAction from '@redux/bookmarks/userBookmarks';

const DynamicCommentsDrawer = dynamic(() => import('@components/drawers/ArticleCommentsDrawer'));

import styles from './index.module.scss';

export interface ISingleArticleActionProps {
    article: IArticle;
}

const SingleArticleAction: FC<ISingleArticleActionProps> = ({ article }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    const [likeCount, setLikeCount] = useState(article.likesCount);
    const [likeOwner, setLikeOwner] = useState<boolean | undefined>(false);
    const [commentCount, setCommentCount] = useState(article.commentsCount);
    const [bookmarkOwner, setBookmarkOwner] = useState<boolean | undefined>(false);

    const [openCommentDrawer, setOpenCommentDrawer] = useState<boolean>(false);

    const { data: allLikes } = useSelector(({ likes: { all } }: IRootState) => all);
    const { data: allComments } = useSelector(({ comments: { all } }: IRootState) => all);
    const { data: allBookmarks } = useSelector(({ bookmarks: { all } }: IRootState) => all);
    const { data: user } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);

    const likes = numeral(likeCount).format('0.[00]a');
    const comments = numeral(commentCount).format('0.[00]a');

    useEffect(() => {
        dispatch(getArticleLikesAction(article.slug));
        dispatch(getArticleBookmarksAction(article.slug));
        dispatch(getAllArticleCommentsAction({ slug: article.slug }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (allLikes?.rows) {
            setLikeCount(allLikes?.count);
            setLikeOwner(isSingleArticleLikeOwner(user?.id, allLikes.rows));
        }
    }, [allLikes, user?.id]);

    useEffect(() => {
        if (allBookmarks?.rows && user?.id) {
            setBookmarkOwner(isSingleArticleBookmarkOwner(user?.id, allBookmarks.rows));
        }
    }, [allBookmarks, user?.id]);

    useEffect(() => {
        if (allComments?.rows) setCommentCount(allComments?.count);
    }, [allComments]);

    const likeArticle = (): void => {
        if (user?.id) {
            dispatch(addArticleLikeAction(article.slug)).then((res) => {
                if (res.type === 'likes/add/rejected') message.error(getPayload(res)?.message);
                else if (res.type === 'likes/add/fulfilled') {
                    setLikeCount(Number(likeCount) + 1);
                    dispatch(getArticleLikesAction(article.slug));
                    message.success(getPayload(res).message);
                }
            });
        } else showAuthRequired(t, dispatch);
    };

    const unlikeArticle = (): void => {
        if (user?.id) {
            dispatch(removeArticleLikeAction(article.slug)).then((res) => {
                if (res.type === 'likes/unlike/rejected') message.error(getPayload(res)?.message);
                else if (res.type === 'likes/unlike/fulfilled') {
                    setLikeCount(Number(likeCount) - 1);
                    dispatch(getArticleLikesAction(article.slug));
                    message.success(getPayload(res).message);
                }
            });
        } else showAuthRequired(t, dispatch);
    };

    const bookmarkArticle = (): void => {
        if (user?.id) {
            dispatch(addArticleBookmarkAction(article?.slug)).then((res) => {
                if (res.type === 'bookmarks/add/rejected') message.error(getPayload(res)?.message);
                else if (res.type === 'bookmarks/add/fulfilled') {
                    dispatch(getUserBookmarksAction());
                    dispatch(getArticleBookmarksAction(article?.slug));
                    message.success(getPayload(res).message);
                }
            });
        } else showAuthRequired(t, dispatch);
    };

    const unBookmarkArticle = (): void => {
        if (user?.id) {
            dispatch(removeArticleBookmarkAction(article?.slug)).then((res) => {
                if (res.type === 'bookmarks/delete/rejected') message.error(getPayload(res)?.message);
                else if (res.type === 'bookmarks/delete/fulfilled') {
                    dispatch(getUserBookmarksAction());
                    dispatch(getArticleBookmarksAction(article?.slug));
                    message.success(getPayload(res).message);
                }
            });
        } else showAuthRequired(t, dispatch);
    };

    return (
        <Row data-theme={value} className={styles.articleAction}>
            <Col className="d-flex justify-content-end">
                <Button
                    data-like
                    type="link"
                    onClick={likeOwner ? unlikeArticle : likeArticle}
                    icon={likeOwner ? <HeartFilled data-liked /> : <HeartOutlined />}
                >
                    <span data-count>&nbsp;{Number(likeCount) > 0 ? likes : ''}</span>
                </Button>
                <Button data-comment type="link" icon={<CommentOutlined />} onClick={() => setOpenCommentDrawer(true)}>
                    <span data-count>&nbsp;{Number(commentCount) > 0 ? comments : ''}</span>
                </Button>
                <Button
                    type="link"
                    data-bookmark
                    onClick={bookmarkOwner ? unBookmarkArticle : bookmarkArticle}
                    icon={
                        bookmarkOwner ? (
                            <RiBookmark3Fill className="anticon" data-bookmarked />
                        ) : (
                            <BsBookmarkPlus className="anticon" />
                        )
                    }
                />
            </Col>
            <DynamicCommentsDrawer
                article={article}
                openDrawer={openCommentDrawer}
                setOpenDrawer={setOpenCommentDrawer}
            />
        </Row>
    );
};

export default SingleArticleAction;
