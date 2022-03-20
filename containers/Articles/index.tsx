import React, { FC } from 'react';
import MainArticle from '@components/common/Cards/Article/ArticleCarousel';
import TagsBar from '@components/Layout/TagsBar';
import { EnumTagsContext } from '@constants/tags-context';
import AlaUneArticleSection from '@components/Home/AlaUneArticleSection';

const ArticleContainer: FC = () => {
    return (
        <div className="d-block">
            <TagsBar context={EnumTagsContext.ARTICLE} />
            <div className="mt-5">
                <MainArticle />
            </div>
            <div className="mt-5">
                <AlaUneArticleSection fetched error={null} articles={[]} canViewAll={false} />
            </div>
        </div>
    );
};

export default ArticleContainer;
