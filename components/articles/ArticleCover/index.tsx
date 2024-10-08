import { FC, useEffect, useState } from 'react';
import numeral from 'numeral';
import Image from 'next/image';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HeartFilled, HeartOutlined } from 'icons';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Grid from 'antd/lib/grid';
import message from 'antd/lib/message';
import Typography from 'antd/lib/typography';

import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { IArticle, IUser } from '@interfaces/api';
import addArticleLikeAction from '@redux/likes/add';
import getArticleLikesAction from '@redux/likes/all';
import showAuthRequired from '@helpers/showAuthRequired';
import removeArticleLikeAction from '@redux/likes/unlike';
import isSingleArticleLikeOwner from '@helpers/isLikeOwner';
import SingleArticleAction from '@components/actions/SingleArticleAction';

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
            setLikeOwner(isSingleArticleLikeOwner(user?.id, allLikes.rows));
        }
    }, [allLikes, user?.id]);

    const likeArticle = (): void => {
        if (user?.id) {
            dispatch(addArticleLikeAction(article.slug)).then((res) => {
                if (res.type === 'likes/add/rejected') message.error(getPayload(res)?.message);
                else if (res.type === 'likes/add/fulfilled') {
                    setLike(Number(like) + 1);
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
                    setLike(Number(like) - 1);
                    dispatch(getArticleLikesAction(article.slug));
                    message.success(getPayload(res).message);
                }
            });
        } else showAuthRequired(t, dispatch);
    };

    return (
        <div className={styles.articleCover}>
            <div className={styles.articleCover__overlay}>
                {!isEmpty(cover) && <Image src={cover as string} layout="fill" priority />}
            </div>
            <Row justify="space-between" align="middle" className={styles.articleCover__content}>
                {lg && (
                    <Col md={24} lg={4} xl={4} xxl={3} className={styles.articleCover__content__like}>
                        {likeOwner ? (
                            <HeartFilled data-is-my-like={Boolean(likeOwner)} onClick={() => unlikeArticle()} />
                        ) : (
                            <HeartOutlined data-is-my-like={Boolean(likeOwner)} onClick={() => likeArticle()} />
                        )}
                        <Text data-likes-value>{Number(like) > 0 && `${likes} ${t('likes')}`}</Text>
                        <Text data-read>
                            {article.reads || 0} min {t('readTime')}
                        </Text>
                    </Col>
                )}
                <Col md={24} lg={20} xl={20} xxl={21} className={styles.articleCover__content__title}>
                    <Title>{article.title}</Title>
                </Col>
                {!lg && (
                    <Row className={styles.articleCover__content__action}>
                        <Col span={16} className={styles.articleCover__content__action__left}>
                            <SingleArticleAction article={article} />
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
