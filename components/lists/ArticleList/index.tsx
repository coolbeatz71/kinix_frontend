import { FC } from 'react';
import dynamic from 'next/dynamic';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { IArticle } from '@interfaces/api';
import { EnumEmptyDataType } from '@constants/empty-data-type';

const DynamicEmptyData = dynamic(() => import('@components/common/EmptyData'));
const DynamicArticleCardVertical = dynamic(() => import('@components/cards/Article/ArticleVertical'));

interface IArticleListProps {
    articles: IArticle[];
    myArticles?: boolean;
}

const ArticleList: FC<IArticleListProps> = ({ articles }) => {
    const { t } = useTranslation();
    return (
        <Row gutter={[16, 48]}>
            {isEmpty(articles) ? (
                <Col span={24}>
                    <DynamicEmptyData type={EnumEmptyDataType.CONTENT} desc={t('noContentFound')} />
                </Col>
            ) : (
                articles?.map((article) => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} key={article.slug}>
                        <DynamicArticleCardVertical article={article} />
                    </Col>
                ))
            )}
        </Row>
    );
};

export default ArticleList;
