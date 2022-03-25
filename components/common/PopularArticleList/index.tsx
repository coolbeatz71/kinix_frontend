import React, { FC } from 'react';
import { Col, Row } from 'antd';
import ArticleCardVertical from '@components/common/Cards/Article/ArticleVertical';
import SectionTitle from '@components/common/SectionTitle';
import { IUnknownObject } from 'interfaces/app';

interface IPopularArticleListProps {
    fetched: boolean;
    error: string | null;
    articles: IUnknownObject[];
    myArticles?: boolean;
}

const PopularArticleList: FC<IPopularArticleListProps> = () => {
    const elements = [0, 1, 2, 3];

    return (
        <Col span={24}>
            <Row>
                <Col span={24}>
                    <SectionTitle title="Popular articles" isRelated />
                </Col>
            </Row>
            <Row gutter={[16, 48]}>
                {elements.map((el) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={el}>
                        <ArticleCardVertical size={el} />
                    </Col>
                ))}
            </Row>
        </Col>
    );
};

export default PopularArticleList;
