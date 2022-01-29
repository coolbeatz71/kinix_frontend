import React, { FC } from 'react';
import { Col, Row } from 'antd';
import VideoCardVertical from '@components/common/Cards/Video/VideoCardVertical';
import { IUnknownObject } from '@type/app';

interface IVideoListProps {
    fetched: boolean;
    error: string | null;
    videos: IUnknownObject[];
    myVideos?: boolean;
}

const VideoList: FC<IVideoListProps> = () => {
    return (
        <Row gutter={[16, 48]}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((el) => (
                <Col span={6} key={el}>
                    <VideoCardVertical size={el} />
                </Col>
            ))}
        </Row>
    );
};

export default VideoList;
