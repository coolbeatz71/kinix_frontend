import React, { FC } from 'react';
import { Col, Row } from 'antd';
import RelatedArticleCard from '@components/common/Cards/Article/RelatedArticle';
import { IUnknownObject } from 'interfaces/app';
import SectionTitle from '@components/common/SectionTitle';

interface IRelatedArticleListProps {
    fetched: boolean;
    error: string | null;
    articles: IUnknownObject[];
}

const RelatedArticleList: FC<IRelatedArticleListProps> = () => {
    const elements = [0, 1, 2, 3];

    return (
        <Row>
            <Col span={24}>
                <SectionTitle title="Related articles" isRelated />
            </Col>
            {elements.map((el) => (
                <Col key={el}>
                    <RelatedArticleCard size={el} />
                </Col>
            ))}
        </Row>
    );
};

export default RelatedArticleList;
