import React, { FC } from 'react';
import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';

const DynamicArticleCardSkeleton = dynamic(() => import('../ArticleCard'));

interface IArticleListSkeletonProps {
    size?: number;
}

const ArticleListSkeleton: FC<IArticleListSkeletonProps> = ({ size = 4 }) => {
    return (
        <Row gutter={[16, 48]}>
            {Array.from(Array(size).keys()).map((el) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} key={el}>
                    <DynamicArticleCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default ArticleListSkeleton;
