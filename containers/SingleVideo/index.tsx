import React, { FC, Fragment } from 'react';
import { Col, Row } from 'antd';
import useDarkLight from '@hooks/useDarkLight';
import VideoPlayer from '@components/common/VideoPlayer';

const SingleVideoContainer: FC = () => {
    const { value } = useDarkLight();

    return (
        <Fragment>
            <Row data-theme={value} justify="space-between">
                <Col span={16}>
                    <VideoPlayer />
                </Col>
                <Col span={8}></Col>
            </Row>
        </Fragment>
    );
};

export default SingleVideoContainer;
