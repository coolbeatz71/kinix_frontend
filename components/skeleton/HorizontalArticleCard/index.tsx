import React, { FC } from 'react';
import { Card, Row, Col, Skeleton } from 'antd';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const HorizontalArticleCardSkeleton: FC = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.horizontalArticleSkeleton}>
            <Card bordered={false}>
                <Row justify="space-between" gutter={[24, 0]}>
                    <Col span={8} className={styles.horizontalArticleSkeleton__image}>
                        <Skeleton.Image />
                    </Col>
                    <Col span={16}>
                        <Row justify="space-between" gutter={48} className="mb-4">
                            <Col span={12}>
                                <Skeleton.Button active block size="small" />
                            </Col>
                            <Col span={8}>
                                <Skeleton.Button active block size="small" />
                            </Col>
                        </Row>
                        <Row justify="space-between">
                            <Skeleton.Button active style={{ width: 200 }} size="small" />
                            <Skeleton.Button active block size="small" />
                            <Skeleton.Button active block size="small" />
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default HorizontalArticleCardSkeleton;
