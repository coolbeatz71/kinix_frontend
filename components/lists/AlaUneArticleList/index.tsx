import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { IArticle } from '@interfaces/api';
import { EnumAlaUnePriority } from '@constants/alaune-article';
import AlaUneArticleCard from '@components/cards/Article/AlaUneArticle';
import TrendingArticleCard from '@components/cards/Article/TrendingArticle';

interface IAlaUneArticleListProps {
    articles: IArticle[];
}

const AlaUneArticleList: FC<IAlaUneArticleListProps> = ({ articles }) => {
    return (
        <Row gutter={[16, 48]}>
            <Col xs={24} sm={24} md={8}>
                {articles[0] && <AlaUneArticleCard article={articles[0]} priority={EnumAlaUnePriority.FIRST} />}
            </Col>
            <Col xs={24} sm={24} md={8}>
                {articles[1] && <AlaUneArticleCard article={articles[1]} priority={EnumAlaUnePriority.SECOND} />}
            </Col>
            <Col xs={24} sm={24} md={8}>
                {articles.slice(2).map((article) => (
                    <TrendingArticleCard key={article.slug} article={article} />
                ))}
            </Col>
        </Row>
    );
};

export default AlaUneArticleList;
