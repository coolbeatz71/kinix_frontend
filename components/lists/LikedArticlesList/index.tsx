import { FC, Fragment, useCallback, useEffect } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { IArticle, ILike } from '@interfaces/api';
import EmptyData from '@components/common/EmptyData';
import getUserLikesAction from '@redux/likes/userLikes';
import SectionTitle from '@components/common/SectionTitle';
import { EnumEmptyDataType } from '@constants/empty-data-type';

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicRelatedArticleCard = dynamic(() => import('@components/cards/Article/RelatedArticle'));
const DynamicLikedArticlesListSkeleton = dynamic(() => import('@components/skeleton/FavoriteArticlesList'));

const LikedArticlesList: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { loading, data: likes, error } = useSelector(({ likes: { user } }: IRootState) => user);

    const loadLikedArticles = useCallback(() => {
        dispatch(getUserLikesAction());
    }, [dispatch]);

    useEffect(() => {
        loadLikedArticles();
    }, [loadLikedArticles]);

    return (
        <Fragment>
            <SectionTitle title={`${t('myLikedArticles')} ${!isEmpty(likes) ? `(${likes?.count})` : ''}`} isRelated />
            {error ? (
                <DynamicServerError error={error} onRefresh={loadLikedArticles} />
            ) : loading ? (
                <DynamicLikedArticlesListSkeleton />
            ) : isEmpty(likes?.rows) ? (
                <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noLikesFound')} />
            ) : (
                <Row align="middle" gutter={[32, 24]}>
                    {likes?.rows?.map((articles: ILike) => (
                        <Col key={articles.id} xs={24} sm={24} md={12} lg={12} xl={8}>
                            <DynamicRelatedArticleCard article={articles.article as IArticle} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};

export default LikedArticlesList;
