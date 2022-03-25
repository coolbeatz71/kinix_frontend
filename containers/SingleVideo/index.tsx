import React, { FC, Fragment } from 'react';
import { Col, Row } from 'antd';
import useDarkLight from '@hooks/useDarkLight';
import VideoPlayer from '@components/common/VideoPlayer';
import PopularVideoList from '@components/common/PopularVideoList';
import RelatedVideoList from '@components/common/RelatedVideoList';

const SingleVideoContainer: FC = () => {
    const { value } = useDarkLight();

    return (
        <Fragment>
            <Row data-theme={value} justify="space-between" gutter={[0, 0]}>
                <Col span={16}>
                    <VideoPlayer />
                    <div className="mt-5">
                        <PopularVideoList fetched error={null} videos={[]} />
                    </div>
                </Col>
                <Col span={8} className="ps-3">
                    <RelatedVideoList fetched error={null} videos={[]} />
                </Col>
            </Row>
        </Fragment>
    );
};

export default SingleVideoContainer;
