import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import HorizontalVideoCardSkeleton from '../HorizontalVideoCard';

const FavoriteVideosListSkeleton: FC = () => {
    return (
        <Row align="middle" gutter={[32, 32]}>
            {Array.from(Array(12).keys()).map((i) => (
                <Col key={i} xs={24} sm={12} md={12} lg={12} xl={8}>
                    <HorizontalVideoCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default FavoriteVideosListSkeleton;
