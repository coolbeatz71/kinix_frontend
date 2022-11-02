import React, { FC } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const ArticleCardSkeleton: FC = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.articleSkeleton}>
            <Card bordered={false}>
                <Row className="mb-2" align="middle">
                    <Col span={24}>
                        <Skeleton.Image active className={styles.articleSkeleton__cover} />
                    </Col>
                </Row>
                <div className={styles.articleSkeleton__content}>
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

export default ArticleCardSkeleton;
