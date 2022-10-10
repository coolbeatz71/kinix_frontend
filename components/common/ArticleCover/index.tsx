import React, { FC, useEffect, useState } from 'react';
import numeral from 'numeral';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Grid, message, Row, Typography } from 'antd';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import isSingleArticleLikeOwner from '@helpers/isLikeOwner';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { IArticle, IUser } from '@interfaces/api';
import ArticleAction from '../Actions/SingleArticleAction';
import addArticleLikeAction from '@redux/likes/add';
import getArticleLikesAction from '@redux/likes/all';
import removeArticleLikeAction from '@redux/likes/unlike';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

export interface IArticleCoverProps {
    user: IUser;
    article: IArticle;
}

const ArticleCover: FC<IArticleCoverProps> = ({ user, article }) => {
    const { t } = useTranslation();
    const { lg } = useBreakpoint();
    const dispatch = useAppDispatch();
    const cover = article.images?.[0];

    const [like, setLike] = useState(article.likesCount);
    const [likeOwner, setLikeOwner] = useState<boolean | undefined>(false);

    const likes = numeral(like).format('0.[00]a');

    const { data: allLikes } = useSelector(({ likes: { all } }: IRootState) => all);

    useEffect(() => {
        if (article.slug) dispatch(getArticleLikesAction(article.slug));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (allLikes?.rows) {
            setLike(allLikes?.count);
            setLikeOwner(isSingleArticleLikeOwner(user.id, allLikes.rows));
        }
    }, [allLikes, user.id]);

    const likeArticle = (): void => {
        dispatch(addArticleLikeAction(article.slug)).then((res) => {
            if (res.type === 'likes/add/rejected') message.error(res.payload?.message);
            else if (res.type === 'likes/add/fulfilled') {
                setLike(Number(like) + 1);
                dispatch(getArticleLikesAction(article.slug));
                message.success(t('likingSuccess'));
            }
        });
    };

    const unlikeArticle = (): void => {
        dispatch(removeArticleLikeAction(article.slug)).then((res) => {
            if (res.type === 'likes/unlike/rejected') message.error(res.payload?.message);
            else if (res.type === 'likes/unlike/fulfilled') {
                setLike(Number(like) - 1);
                dispatch(getArticleLikesAction(article.slug));
                message.success(t('unLikingSuccess'));
            }
        });
    };

    return (
        <div className={styles.articleCover}>
            <div className={styles.articleCover__overlay}>
                {!isEmpty(cover) && <Image src={cover as string} layout="fill" />}
            </div>
            <Row justify="space-between" align="middle" className={styles.articleCover__content}>
                {lg && (
                    <Col md={24} lg={3} className={styles.articleCover__content__like}>
                        {likeOwner ? (
                            <HeartFilled data-is-my-like={likeOwner} onClick={() => unlikeArticle()} />
                        ) : (
                            <HeartOutlined data-is-my-like={likeOwner} onClick={() => likeArticle()} />
                        )}
                        <Text data-likes-value>{Number(like) > 0 && `${likes} ${t('likes')}`}</Text>
                        <Text data-read>
                            {article.reads || 0} min {t('readTime')}
                        </Text>
                    </Col>
                )}
                <Col md={24} lg={21} className={styles.articleCover__content__title}>
                    <Title>{article.title}</Title>
                </Col>
                {!lg && (
                    <Row className={styles.articleCover__content__action}>
                        <Col span={16} className={styles.articleCover__content__action__left}>
                            <ArticleAction article={article} />
                        </Col>
                        <Col span={8} className={styles.articleCover__content__action__right}>
                            <Text data-read>
                                {article.reads || 0} min {t('readTime')}
                            </Text>
                        </Col>
                    </Row>
                )}
            </Row>
        </div>
    );
};

export default ArticleCover;
