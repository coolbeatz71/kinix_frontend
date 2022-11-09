import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Grid from 'antd/lib/grid';
import Skeleton from 'antd/lib/skeleton';

import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;

const MainArticleSkeleton: FC = () => {
    const { lg } = useBreakpoint();
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.mainArticleSkeleton}>
            <Card bordered={false}>
                <Row justify="space-between" align="middle" gutter={32}>
                    <Col xs={24} sm={24} md={24} lg={10}>
                        <Card bordered={false} className={styles.mainArticleSkeleton__card}>
                            <Row className="mb-4" justify="space-between" gutter={32}>
                                <Col lg={8}>
                                    <Skeleton.Button size="small" active block />
                                </Col>
                                <Col lg={6}>
                                    <Skeleton.Button size="small" active block />
                                </Col>
                            </Row>
                            <div className="mb-4">
                                <Skeleton.Button style={{ width: '70%' }} size="large" active block />
                                <Skeleton.Button size="large" active block />
                                <Skeleton.Button style={{ width: '90%' }} size="large" active block />
                            </div>
                            <div className="mt-4">
                                <Skeleton active />
                            </div>
                        </Card>
                    </Col>
                    {lg && (
                        <Col xs={24} sm={24} md={24} lg={14}>
                            <Skeleton.Image className={styles.mainArticleSkeleton__image} />
                        </Col>
                    )}
                </Row>
            </Card>
        </div>
    );
};

export default MainArticleSkeleton;
