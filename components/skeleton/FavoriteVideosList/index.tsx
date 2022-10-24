import React, { FC } from 'react';
import { Col, Row } from 'antd';
import HorizontalVideoCardSkeleton from '../HorizontalVideoCard';

const FavoriteVideosListSkeleton: FC = () => {
    return (
        <Row align="middle" gutter={[32, 32]}>
            {Array.from(Array(12).keys()).map((i) => (
                <Col key={i} xs={24} sm={12} md={8}>
                    <HorizontalVideoCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default FavoriteVideosListSkeleton;
