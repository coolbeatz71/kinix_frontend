import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import HorizontalArticleCardSkeleton from '../HorizontalArticleCard';

const FavoriteArticlesListSkeleton: FC = () => {
    return (
        <Row align="middle" gutter={[32, 32]}>
            {Array.from(Array(12).keys()).map((i) => (
                <Col key={i} xs={24} sm={12} md={8}>
                    <HorizontalArticleCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default FavoriteArticlesListSkeleton;
