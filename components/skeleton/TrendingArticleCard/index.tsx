import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';

import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const TrendingArticleSkeleton: FC = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.trendingSkeleton}>
            <Card bordered={false}>
                <Row justify="space-between" gutter={48} className="mb-4">
                    <Col span={12}>
                        <Skeleton.Button active block size="small" />
                    </Col>
                    <Col span={6}>
                        <Skeleton.Button active block size="small" />
                    </Col>
                </Row>
                <Row justify="space-between">
                    <Skeleton.Button active style={{ width: 200 }} size="small" />
                    <Skeleton.Button active block size="small" />
                    <Skeleton.Button active block size="small" />
                </Row>
            </Card>
        </div>
    );
};

export default TrendingArticleSkeleton;
