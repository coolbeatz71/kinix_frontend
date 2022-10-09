import React, { FC, useEffect, useState } from 'react';
import numeral from 'numeral';
import { Button, Col, message, Row } from 'antd';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import { CommentOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { IArticle } from '@interfaces/api';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import isLikeOwner from '@helpers/isLikeOwner';
import addArticleLikeAction from '@redux/likes/add';
import getArticleLikesAction from '@redux/likes/all';
import removeArticleLikeAction from '@redux/likes/unlike';
import ArticleCommentsDrawer from '@components/comment/ArticleCommentsDrawer';

import styles from './index.module.scss';

export interface IArticleActionProps {
    article: IArticle;
}

const ArticleAction: FC<IArticleActionProps> = ({ article }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    const [likeCount, setLikeCount] = useState(article.likesCount);
    const [likeOwner, setLikeOwner] = useState<boolean | undefined>(false);
    const [commentCount, setCommentCount] = useState(article.commentsCount);

    const [openCommentDrawer, setOpenCommentDrawer] = useState<boolean>(false);

    const { data: allLikes } = useSelector(({ likes: { all } }: IRootState) => all);
    const { error: errLike } = useSelector(({ likes: { add } }: IRootState) => add);
    const { data: allComments } = useSelector(({ comments: { all } }: IRootState) => all);
    const { error: errUnlike } = useSelector(({ likes: { unlike } }: IRootState) => unlike);
    const { data: user } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);

    const likes = numeral(likeCount).format('0.[00]a');
    const comments = numeral(commentCount).format('0.[00]a');

    useEffect(() => {
        if (article.slug) dispatch(getArticleLikesAction(article.slug));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (allLikes?.rows) {
            setLikeCount(allLikes?.count);
            if (allLikes?.rows) setLikeOwner(isLikeOwner(user.id, allLikes.rows));
        }
    }, [allLikes, user.id]);

    useEffect(() => {
        if (allComments?.rows) setCommentCount(allComments?.count);
    }, [allComments]);

    const likeArticle = (): void => {
        dispatch(addArticleLikeAction(article.slug)).then((res) => {
            if (res.type === 'likes/add/rejected') message.error(errLike?.message);
            else if (res.type === 'likes/add/fulfilled') {
                setLikeCount(Number(likeCount) + 1);
                dispatch(getArticleLikesAction(article.slug));
                message.success(t('likingSuccess'));
            }
        });
    };

    const unlikeArticle = (): void => {
        dispatch(removeArticleLikeAction(article.slug)).then((res) => {
            if (res.type === 'likes/unlike/rejected') message.error(errUnlike?.message);
            else if (res.type === 'likes/unlike/fulfilled') {
                setLikeCount(Number(likeCount) - 1);
                dispatch(getArticleLikesAction(article.slug));
                message.success(t('unLikingSuccess'));
            }
        });
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
                    <span data-count>{likes}</span>
                </Button>
                <Button data-comment type="link" icon={<CommentOutlined />} onClick={() => setOpenCommentDrawer(true)}>
                    <span data-count>{comments}</span>
                </Button>
                <Button data-bookmark type="link" icon={<MdOutlineBookmarkAdd />} />
            </Col>
            <ArticleCommentsDrawer
                article={article}
                openDrawer={openCommentDrawer}
                setOpenDrawer={setOpenCommentDrawer}
            />
        </Row>
    );
};

export default ArticleAction;
