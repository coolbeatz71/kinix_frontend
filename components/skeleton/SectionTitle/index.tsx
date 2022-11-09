import { FC } from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Skeleton from 'antd/lib/skeleton';

const SectionTitleSkeleton: FC = () => (
    <Row justify="space-between" align="middle" className="my-5">
        <Col span={24}>
            <Skeleton.Button size="large" block active />
        </Col>
    </Row>
);

export default SectionTitleSkeleton;
