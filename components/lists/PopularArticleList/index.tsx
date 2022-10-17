import React, { FC, useEffect } from 'react';
import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IArticle } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import SectionTitle from '@components/common/SectionTitle';
import getPopularArticlesAction from '@redux/articles/popular';

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicArticleListSkeleton = dynamic(() => import('@components/skeleton/ArticleList'));
const DynamicArticleCardVertical = dynamic(() => import('@components/cards/Article/ArticleVertical'));

const PopularArticleList: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { loading, error, data } = useSelector(({ articles: { popular } }: IRootState) => popular);

    useEffect(() => {
        dispatch(getPopularArticlesAction());
    }, [dispatch]);

    return (
        <Col span={24}>
            <Row>
                <Col span={24}>
                    <SectionTitle title={t('popularArticles')} isRelated />
                </Col>
            </Row>
            <Row gutter={[16, 48]}>
                {error ? (
                    <DynamicServerError
                        error={error}
                        onRefresh={() => {
                            dispatch(getPopularArticlesAction());
                        }}
                    />
                ) : loading ? (
                    <DynamicArticleListSkeleton size={8} />
                ) : (
                    !isEmpty(data) &&
                    data?.map((article) => (
                        <Col xs={24} sm={12} md={12} lg={8} xl={6} key={article.id}>
                            <DynamicArticleCardVertical article={article as IArticle} />
                        </Col>
                    ))
                )}
            </Row>
        </Col>
    );
};

export default PopularArticleList;
