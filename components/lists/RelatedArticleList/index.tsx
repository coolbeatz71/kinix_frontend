import React, { FC, Fragment } from 'react';
import { Col, Row } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { IArticle } from '@interfaces/api';
import { CONTENT_LIMIT } from '@constants/app';
import SectionTitle from '@components/common/SectionTitle';
import RelatedArticleCard from '@components/cards/Article/RelatedArticle';

interface IRelatedArticleListProps {
    articles: IArticle[];
}

const RelatedArticleList: FC<IRelatedArticleListProps> = ({ articles }) => {
    const { t } = useTranslation();
    const related = articles.slice(0, CONTENT_LIMIT);

    return (
        <Row>
            {!isEmpty(related) && (
                <Fragment>
                    <Col span={24}>
                        <SectionTitle title={t('relatedArticles')} isRelated />
                    </Col>
                    {articles?.map((article) => (
                        <Col key={article.id} span={24}>
                            <RelatedArticleCard article={article} />
                        </Col>
                    ))}
                </Fragment>
            )}
        </Row>
    );
};

export default RelatedArticleList;
