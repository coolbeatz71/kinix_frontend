import React, { FC } from 'react';
import MainArticle from '@components/common/Cards/Article/ArticleCarousel';
import TagsBar from '@components/Layout/TagsBar';
import { EnumTagsContext } from '@constants/tags-context';

const ArticleContainer: FC = () => {
    return (
        <div className="d-block">
            <TagsBar context={EnumTagsContext.ARTICLE} />
            <div className="mt-5">
                <MainArticle />
            </div>
        </div>
    );
};

export default ArticleContainer;
