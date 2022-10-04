import React, { FC, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import SectionTitle from '@components/common/SectionTitle';
import { IArticle } from '@interfaces/api';
import ServerError from '../ServerError';
import getPopularArticlesAction from '@redux/articles/popular';
import ArticleCardVertical from '@components/common/Cards/Article/ArticleVertical';
import ArticleListSkeleton from '@components/skeleton/ArticleList';
import { isEmpty } from 'lodash';

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
                    <ServerError
                        onRefresh={() => {
                            dispatch(getPopularArticlesAction());
                        }}
                    />
                ) : loading ? (
                    <ArticleListSkeleton size={8} />
                ) : (
                    !isEmpty(data) &&
                    data?.map((article) => (
                        <Col xs={24} sm={12} md={12} lg={8} xl={6} key={article.id}>
                            <ArticleCardVertical article={article as IArticle} />
                        </Col>
                    ))
                )}
            </Row>
        </Col>
    );
};

export default PopularArticleList;
