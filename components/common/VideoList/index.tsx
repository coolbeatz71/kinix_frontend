import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { IVideo } from '@interfaces/api';
import VideoCardVertical from '@components/common/Cards/Video/VideoCardVertical';

interface IVideoListProps {
    videos: IVideo[];
    myVideos?: boolean;
    isExclusive?: boolean;
}

const VideoList: FC<IVideoListProps> = ({ videos, isExclusive }) => {
    return (
        <Row gutter={[16, 48]}>
            {videos?.map((video) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} key={video.slug}>
                    <VideoCardVertical video={video} isExclusive={isExclusive} />
                </Col>
            ))}
        </Row>
    );
};

export default VideoList;
