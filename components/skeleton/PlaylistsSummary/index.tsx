import { FC, Fragment } from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Skeleton from 'antd/lib/skeleton';

const PlaylistsSummarySkeleton: FC = () => (
    <Fragment>
        {Array.from(Array(6).keys()).map((item, idx) => (
            <Row key={item} className={`${![0, 5].includes(idx) ? 'my-4' : ''}`} justify="space-between">
                <Col span={2}>
                    <Skeleton.Button shape="circle" size="small" active block />
                </Col>
                <Col span={21}>
                    <Skeleton.Button size="small" active block />
                </Col>
            </Row>
        ))}
    </Fragment>
);

export default PlaylistsSummarySkeleton;
