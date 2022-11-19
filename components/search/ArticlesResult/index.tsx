import { FC, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import { IArticle } from '@interfaces/api';
import { useTranslation } from 'react-i18next';
import EmptyData from '@components/common/EmptyData';
import SearchResultCard from '@components/cards/SearchResult';
import { EnumEmptyDataType } from '@constants/empty-data-type';

export interface IArticlesResultProps {
    articles: IArticle[];
}

const ArticlesResult: FC<IArticlesResultProps> = ({ articles }) => {
    const { t } = useTranslation();

    return (
        <Fragment>
            {isEmpty(articles) ? (
                <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noSearchResultFound')} />
            ) : (
                articles?.map((article) => <SearchResultCard key={article.slug} data={article} />)
            )}
        </Fragment>
    );
};

export default ArticlesResult;
