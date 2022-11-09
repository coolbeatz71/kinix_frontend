import { FC } from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';

import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const VideoCardSkeleton: FC = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.videoSkeleton}>
            <Card bordered={false}>
                <Row className="mb-4" align="middle">
                    <Col span={24}>
                        <Skeleton.Image active className={styles.videoSkeleton__cover} />
                    </Col>
                </Row>
                <div className={styles.videoSkeleton__content}>
                    <Row justify="space-between" className="mb-4">
                        <Skeleton
                            title
                            active
                            paragraph={{
                                rows: 2,
                            }}
                        />
                    </Row>
                    <Row align="middle" justify="space-between" gutter={12}>
                        <Col span={8}>
                            <Skeleton.Button block active />
                        </Col>
                        <Col span={8}>
                            <Skeleton.Button block active />
                        </Col>
                        <Col span={8}>
                            <Skeleton.Button block active />
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    );
};

export default VideoCardSkeleton;
