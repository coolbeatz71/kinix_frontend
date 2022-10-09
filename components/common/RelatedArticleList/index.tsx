import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { IArticle } from '@interfaces/api';
import SectionTitle from '@components/common/SectionTitle';
import RelatedArticleCard from '@components/common/Cards/Article/RelatedArticle';

interface IRelatedArticleListProps {
    articles: IArticle[];
}

const RelatedArticleList: FC<IRelatedArticleListProps> = ({ articles }) => {
    const { t } = useTranslation();

    return (
        <Row>
            <Col span={24}>
                <SectionTitle title={t('relatedArticles')} isRelated />
            </Col>
            {articles?.map((article) => (
                <Col key={article.id} span={24}>
                    <RelatedArticleCard article={article} />
                </Col>
            ))}
        </Row>
    );
};

export default RelatedArticleList;
