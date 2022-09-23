import React, { FC } from 'react';
import MainArticle from '@components/common/ArticleCarousel';
import TagsBar from '@components/layout/TagsBar';
import { EnumTagsContext } from '@constants/tags-context';
import AlaUneArticleSection from '@components/home/AlaUneArticleSection';
import ArticleList from '@components/common/ArticleList';
import SubscribeNewsLetter from '@components/common/Cards/Article/SubscribeNewsLetter';

const ArticleContainer: FC = () => {
    return (
        <div className="d-block">
            <TagsBar context={EnumTagsContext.ARTICLE} />
            <div className="mt-5">
                <MainArticle />
            </div>
            <div className="mt-5">
                <AlaUneArticleSection canViewAll={false} />
            </div>

            <div className="mt-5">
                <SubscribeNewsLetter />
            </div>

            <div className="mt-5">
                <ArticleList fetched={true} error={null} articles={[]} myArticles={false} />
            </div>
        </div>
    );
};

export default ArticleContainer;
