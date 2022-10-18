import React, { FC } from 'react';
import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';

const DynamicVideoCardSkeleton = dynamic(() => import('../VideoCard'));

interface IVideoListSkeletonProps {
    size?: number;
    isPopular?: boolean;
}

const VideoListSkeleton: FC<IVideoListSkeletonProps> = ({ size = 4, isPopular = false }) => {
    return (
        <Row gutter={[16, 48]}>
            {Array.from(Array(size).keys()).map((el) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={isPopular ? 8 : 6} key={el}>
                    <DynamicVideoCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default VideoListSkeleton;
