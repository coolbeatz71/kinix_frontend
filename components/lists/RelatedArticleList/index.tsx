import { FC, Fragment } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { IArticle } from '@interfaces/api';
import { CONTENT_LIMIT } from '@constants/app';

const DynamicSectionTitle = dynamic(() => import('@components/common/SectionTitle'));
const DynamicRelatedArticleCard = dynamic(() => import('@components/cards/Article/RelatedArticle'));

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
                        <DynamicSectionTitle title={t('relatedArticles')} isRelated />
                    </Col>
                    {articles?.map((article) => (
                        <Col key={article.id} span={24}>
                            <DynamicRelatedArticleCard article={article} />
                        </Col>
                    ))}
                </Fragment>
            )}
        </Row>
    );
};

export default RelatedArticleList;
