import { FC } from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Grid from 'antd/lib/grid';
import Skeleton from 'antd/lib/skeleton';

const { useBreakpoint } = Grid;

const SectionTitleSkeleton: FC = () => {
    const { lg } = useBreakpoint();
    return (
        <Row justify="space-between" align="middle" className={lg ? 'my-5' : 'my-4'}>
            <Col span={24}>
                <Skeleton.Button size="large" block active />
            </Col>
        </Row>
    );
};

export default SectionTitleSkeleton;
