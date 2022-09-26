import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { IVideo } from '@interfaces/api';
import VideoCardVertical from '@components/common/Cards/Video/VideoCardVertical';

interface IPopularVideoListProps {
    fetched: boolean;
    videos: IVideo[];
    myVideos?: boolean;
    error: string | null;
}

const PopularVideoList: FC<IPopularVideoListProps> = ({ videos }) => {
    return (
        <Row gutter={[16, 32]}>
            {videos?.map((video) => (
                <Col xs={24} sm={12} md={8} key={video?.slug}>
                    <VideoCardVertical video={video} />
                </Col>
            ))}
        </Row>
    );
};

export default PopularVideoList;
