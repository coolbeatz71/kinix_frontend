import React, { FC } from 'react';
import { Col, Row } from 'antd';
import VideoCardVertical from '@components/common/Cards/Video/VideoCardVertical';
import { IUnknownObject } from 'interfaces/app';

interface IVideoListProps {
    fetched: boolean;
    myVideos?: boolean;
    hasExclusive?: boolean;
    videos: IUnknownObject[];
}

const VideoList: FC<IVideoListProps> = ({ hasExclusive = false }) => {
    const elements = hasExclusive ? [0, 1, 2, 3] : [0, 1, 2, 3, 4, 5, 6, 7];

    return (
        <Row gutter={[16, 48]}>
            {elements.map((el) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} key={el}>
                    <VideoCardVertical size={el} />
                </Col>
            ))}
        </Row>
    );
};

export default VideoList;
