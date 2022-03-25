import React, { FC } from 'react';
import { Col, Row } from 'antd';
import SectionTitle from '@components/common/SectionTitle';
import { IUnknownObject } from 'interfaces/app';
import VideoCardVertical from '@components/common/Cards/Video/VideoCardVertical';

interface IPopularVideoListProps {
    fetched: boolean;
    error: string | null;
    videos: IUnknownObject[];
    myVideos?: boolean;
}

const PopularVideoList: FC<IPopularVideoListProps> = () => {
    const elements = [0, 1, 2, 3, 4, 5];

    return (
        <Col span={24}>
            <Row>
                <Col span={24}>
                    <SectionTitle title="Popular videos" isRelated />
                </Col>
            </Row>
            <Row gutter={[16, 32]}>
                {elements.map((el) => (
                    <Col xs={24} sm={12} md={8} key={el}>
                        <VideoCardVertical size={el} />
                    </Col>
                ))}
            </Row>
        </Col>
    );
};

export default PopularVideoList;
