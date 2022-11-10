import { FC } from 'react';
import dynamic from 'next/dynamic';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import { EnumAlaUnePriority } from '@constants/alaune-article';

const DynamicAlaUneArticleCardSkeleton = dynamic(() => import('../AlaUneArticleCard'));
const DynamicTrendingArticleSkeleton = dynamic(() => import('../TrendingArticleCard'));

const AlaUneArticleListSkeleton: FC = () => {
    return (
        <Row gutter={[16, 48]}>
            <Col xs={24} sm={24} md={8}>
                <DynamicAlaUneArticleCardSkeleton priority={EnumAlaUnePriority.FIRST} />
            </Col>
            <Col xs={24} sm={24} md={8}>
                <DynamicAlaUneArticleCardSkeleton priority={EnumAlaUnePriority.SECOND} />
            </Col>
            <Col xs={24} sm={24} md={8}>
                <DynamicTrendingArticleSkeleton />
                <DynamicTrendingArticleSkeleton />
                <DynamicTrendingArticleSkeleton />
            </Col>
        </Row>
    );
};

export default AlaUneArticleListSkeleton;
