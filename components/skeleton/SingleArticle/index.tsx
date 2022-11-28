import { FC } from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Space from 'antd/lib/space';
import Grid from 'antd/lib/grid';
import Skeleton from 'antd/lib/skeleton';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;

const SingleArticleSkeleton: FC = () => {
    const { md } = useBreakpoint();

    const paragraph = Array.from(Array(2).keys()).map((i) => <Skeleton key={i} paragraph={{ rows: 4 }} active />);
    const shareButton = Array.from(Array(5).keys()).map((i) => (
        <Skeleton.Button key={i} size="large" active shape="circle" />
    ));

    return (
        <div className={styles.articleSkeleton}>
            <Skeleton.Image className={styles.articleSkeleton__image} active />
            <Row>
                {md && (
                    <Col xs={3} sm={2} md={3} lg={5} className="d-flex justify-content-end pe-4">
                        <Space direction="vertical" size={12} className="mt-4">
                            {shareButton}
                        </Space>
                    </Col>
                )}
                <Col xs={24} sm={24} md={21} lg={12} className="mt-4">
                    {paragraph}
                    <Skeleton.Image className={styles.articleSkeleton__body__image} active />
                </Col>
            </Row>
        </div>
    );
};

export default SingleArticleSkeleton;
