import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { IUnknownObject } from '@type/app';
import AlaUneArticleCard from '../Cards/Article/AlaUneArticle';
import { EnumAlaUnePriority } from '@constants/alaune-article';
import TrendingArticleCard from '../Cards/Article/TrendingArticle';

interface IAlaUneArticleListProps {
    fetched: boolean;
    error: string | null;
    articles: IUnknownObject[];
}

const AlaUneArticleList: FC<IAlaUneArticleListProps> = () => {
    return (
        <>
            <Row gutter={[16, 48]}>
                <Col span={8}>
                    <AlaUneArticleCard size={1} priority={EnumAlaUnePriority.FIRST} />
                </Col>
                <Col span={8}>
                    <AlaUneArticleCard size={2} priority={EnumAlaUnePriority.SECOND} />
                </Col>
                <Col span={8}>
                    <TrendingArticleCard />
                    <TrendingArticleCard />
                    <TrendingArticleCard />
                </Col>
            </Row>
        </>
    );
};

export default AlaUneArticleList;
