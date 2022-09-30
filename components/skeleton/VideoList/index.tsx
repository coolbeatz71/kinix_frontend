import { Col, Row } from 'antd';
import React, { FC } from 'react';
import VideoCardSkeleton from '../VideoCard';

interface IVideoListSkeletonProps {
    size?: number;
}

const VideoListSkeleton: FC<IVideoListSkeletonProps> = ({ size = 4 }) => {
    return (
        <Row gutter={[16, 48]}>
            {Array.from(Array(size).keys()).map((el) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} key={el}>
                    <VideoCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default VideoListSkeleton;
