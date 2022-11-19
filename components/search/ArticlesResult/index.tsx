import React, { FC, Fragment } from 'react';
import { IArticle } from '@interfaces/api';
import SearchResultCard from '../SearchResultCard';

export interface IArticlesResultProps {
    articles: IArticle[];
}

const ArticlesResult: FC<IArticlesResultProps> = ({ articles }) => {
    return (
        <Fragment>
            {articles.map((article) => (
                <SearchResultCard key={article.slug} data={article} />
            ))}
        </Fragment>
    );
};

export default ArticlesResult;
