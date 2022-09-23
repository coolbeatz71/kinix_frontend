import React, { FC } from 'react';
import { Col, Row } from 'antd';
import AlaUneArticleCardSkeleton from '../AlaUneArticleCard';
import TrendingArticleSkeleton from '../TrendingArticleCard';
import { EnumAlaUnePriority } from '@constants/alaune-article';

const AlaUneArticleListSkeleton: FC = () => {
    return (
        <Row gutter={[16, 48]}>
            <Col xs={24} sm={24} md={8}>
                <AlaUneArticleCardSkeleton priority={EnumAlaUnePriority.FIRST} />
            </Col>
            <Col xs={24} sm={24} md={8}>
                <AlaUneArticleCardSkeleton priority={EnumAlaUnePriority.SECOND} />
            </Col>
            <Col xs={24} sm={24} md={8}>
                <TrendingArticleSkeleton />
                <TrendingArticleSkeleton />
                <TrendingArticleSkeleton />
            </Col>
        </Row>
    );
};

export default AlaUneArticleListSkeleton;
