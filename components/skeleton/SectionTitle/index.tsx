import React, { FC } from 'react';
import { Col, Row, Skeleton } from 'antd';

const SectionTitleSkeleton: FC = () => (
    <Row justify="space-between" align="middle" className="my-5">
        <Col span={24}>
            <Skeleton.Button size="large" block active />
        </Col>
    </Row>
);

export default SectionTitleSkeleton;
