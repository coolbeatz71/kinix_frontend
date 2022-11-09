import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import VideoCardSkeleton from '../VideoCard';

interface IVideoListSkeletonProps {
    size?: number;
    isPopular?: boolean;
}

const VideoListSkeleton: FC<IVideoListSkeletonProps> = ({ size = 4, isPopular = false }) => {
    return (
        <Row gutter={[16, 48]}>
            {Array.from(Array(size).keys()).map((el) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={isPopular ? 8 : 6} key={el}>
                    <VideoCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default VideoListSkeleton;
