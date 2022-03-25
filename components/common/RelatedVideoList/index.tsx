import React, { FC } from 'react';
import { Col, Row } from 'antd';
import RelatedVideoCard from '@components/common/Cards/Video/RelatedVideo';
import { IUnknownObject } from 'interfaces/app';
import SectionTitle from '@components/common/SectionTitle';

interface IRelatedVideoListProps {
    fetched: boolean;
    error: string | null;
    videos: IUnknownObject[];
}

const RelatedVideoList: FC<IRelatedVideoListProps> = () => {
    const elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <Row>
            <Col span={24}>
                <SectionTitle title="Related videos" isRelated />
            </Col>
            {elements.map((el) => (
                <Col key={el}>
                    <RelatedVideoCard size={el} />
                </Col>
            ))}
        </Row>
    );
};

export default RelatedVideoList;
