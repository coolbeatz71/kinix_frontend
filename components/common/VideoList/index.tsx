import React, { FC } from 'react';
import { Col, Row } from 'antd';
import VideoCardVertical from '@components/common/Cards/VideoCardVertical';
import { IUnknownObject } from '@type/app';

interface IVideoListProps {
    fetched: boolean;
    error: string | null;
    data: IUnknownObject[];
    myVideos?: boolean;
}

const VideoList: FC<IVideoListProps> = () => {
    return (
        <Row gutter={[24, 48]}>
            {[0, 1, 2, 3].map((el) => (
                <Col span={6} key={el}>
                    <VideoCardVertical />
                </Col>
            ))}
        </Row>
    );
};

export default VideoList;
