import React, { FC } from 'react';
import { Col, Row } from 'antd';
import ArticleCardVertical from '@components/common/Cards/Article/ArticleVertical';
import { IUnknownObject } from 'interfaces/app';

interface IArticleListProps {
    fetched: boolean;
    error: string | null;
    articles: IUnknownObject[];
    myArticles?: boolean;
}

const ArticleList: FC<IArticleListProps> = () => {
    const elements = [0, 1, 2, 3, 4, 5, 6, 7];

    return (
        <Row gutter={[16, 48]}>
            {elements.map((el) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} key={el}>
                    <ArticleCardVertical size={el} />
                </Col>
            ))}
        </Row>
    );
};

export default ArticleList;
