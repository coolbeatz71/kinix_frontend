import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';

import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const HorizontalArticleCardSkeleton: FC = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.horizontalArticleSkeleton}>
            <Card bordered={false}>
                <Row justify="space-between" gutter={[12, 0]}>
                    <Col span={10} className={styles.horizontalArticleSkeleton__image}>
                        <Skeleton.Image />
                    </Col>
                    <Col span={14}>
                        <Row justify="space-between" className="mb-4">
                            <Col span={10}>
                                <Skeleton.Button active block size="small" />
                            </Col>
                            <Col span={10}>
                                <Skeleton.Button active block size="small" />
                            </Col>
                        </Row>
                        <Row justify="space-between">
                            <Skeleton.Button active size="small" />
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
