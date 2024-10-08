import { FC } from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Grid from 'antd/lib/grid';
import Skeleton from 'antd/lib/skeleton';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;

const SingleVideoSkeleton: FC = () => {
    const { lg } = useBreakpoint();

    const relatedVideos = Array.from(Array(4).keys()).map((i) => (
        <Skeleton.Button key={i} size="large" active block className={styles.videoSkeleton__related} />
    ));

    return (
        <Row justify="space-between" gutter={[18, lg ? 18 : 48]} className={styles.videoSkeleton}>
            <Col xs={24} sm={24} md={24} lg={16}>
                <Skeleton.Image className={styles.videoSkeleton__player} active />
                <Skeleton.Button className={styles.videoSkeleton__tab} active block />
            </Col>

            <Col xs={24} sm={24} md={24} lg={8}>
                <Skeleton.Button active block />
                {relatedVideos}
            </Col>
        </Row>
    );
};

export default SingleVideoSkeleton;
