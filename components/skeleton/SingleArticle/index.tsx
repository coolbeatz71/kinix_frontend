import { FC } from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Space from 'antd/lib/space';
import Skeleton from 'antd/lib/skeleton';

import styles from './index.module.scss';

const SingleArticleSkeleton: FC = () => {
    const paragraph = Array.from(Array(2).keys()).map((i) => <Skeleton key={i} paragraph={{ rows: 4 }} active />);
    const shareButton = Array.from(Array(5).keys()).map((i) => (
        <Skeleton.Button key={i} size="large" active shape="circle" />
    ));

    return (
        <div className={styles.articleSkeleton}>
            <Skeleton.Button className={styles.articleSkeleton__image} active block />
            <Row>
                <Col xs={3} sm={2} lg={5} className="d-flex justify-content-end pe-4">
                    <Space direction="vertical" size={12} className="mt-4">
                        {shareButton}
                    </Space>
                </Col>
                <Col xs={21} sm={22} lg={12} className="mt-4">
                    {paragraph}
                </Col>
            </Row>
        </div>
    );
};

export default SingleArticleSkeleton;
