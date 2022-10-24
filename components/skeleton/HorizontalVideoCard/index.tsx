import React, { FC } from 'react';
import { Card, Row, Col, Skeleton } from 'antd';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const HorizontalVideoCardSkeleton: FC = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.horizontalVideoSkeleton}>
            <Card bordered={false}>
                <Row justify="space-between" gutter={[24, 0]}>
                    <Col span={8} className={styles.horizontalVideoSkeleton__image}>
                        <Skeleton.Image />
                    </Col>
                    <Col span={16}>
                        <Row justify="space-between">
                            <Skeleton.Button active block size="small" />
                            <Skeleton.Button active style={{ width: 200 }} size="small" />
                        </Row>
                        <Row className="mt-3">
                            <Col span={24}>
                                <Skeleton.Button style={{ width: 80 }} active size="small" />
                            </Col>
                            <Col span={24}>
                                <Skeleton.Button style={{ width: 100 }} active size="small" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default HorizontalVideoCardSkeleton;
