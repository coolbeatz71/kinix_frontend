import React, { FC, Fragment } from 'react';
import { Col, Grid, Row } from 'antd';
import useDarkLight from '@hooks/useDarkLight';
import VideoPlayer from '@components/common/VideoPlayer';
import RelatedVideoList from '@components/common/RelatedVideoList';
import VideosTabs from '@components/common/VideosTabs';

const { useBreakpoint } = Grid;

const SingleVideoContainer: FC = () => {
    const { lg } = useBreakpoint();
    const { value } = useDarkLight();

    return (
        <Fragment>
            <Row data-theme={value} justify="space-between" gutter={[0, 0]}>
                <Col xs={24} sm={24} md={24} lg={16}>
                    <VideoPlayer />
                    <div className="mt-5">
                        <VideosTabs />
                    </div>
                </Col>
                {lg && (
                    <Col lg={8} className="ps-3">
                        <RelatedVideoList fetched error={null} videos={[]} />
                    </Col>
                )}
            </Row>
        </Fragment>
    );
};

export default SingleVideoContainer;
