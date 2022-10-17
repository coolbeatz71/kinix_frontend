import React, { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { IArticle } from '@interfaces/api';
import EmptyData from '@components/common/EmptyData';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import ArticleCardVertical from '@components/cards/Article/ArticleVertical';

interface IArticleListProps {
    articles: IArticle[];
    myArticles?: boolean;
}

const ArticleList: FC<IArticleListProps> = ({ articles }) => {
    const { t } = useTranslation();
    return (
        <Row gutter={[16, 48]}>
            {isEmpty(articles) ? (
                <Col span={24}>
                    <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noContentFound')} />
                </Col>
            ) : (
                articles?.map((article) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={article.slug}>
                        <ArticleCardVertical article={article} />
                    </Col>
                ))
            )}
        </Row>
    );
};

export default ArticleList;
