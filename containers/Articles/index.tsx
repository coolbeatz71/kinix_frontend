import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import TagsBar from '@components/layout/TagsBar';
import ArticleList from '@components/common/ArticleList';
import getArticlesTagsAction from '@redux/articles/tags';
import { EnumTagsContext } from '@constants/tags-context';
import MainArticle from '@components/common/ArticleCarousel';
import AlaUneArticleSection from '@components/home/AlaUneArticleSection';
import SubscribeNewsLetter from '@components/common/Cards/Article/SubscribeNewsLetter';

const ArticleContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { loading, data: tags, error } = useSelector(({ videos: { tags } }: IRootState) => tags);

    useEffect(() => {
        dispatch(getArticlesTagsAction());
    }, [dispatch]);

    return (
        <div className="d-block">
            <TagsBar
                error={error}
                loading={loading}
                context={EnumTagsContext.ARTICLE}
                tags={tags as unknown as string[]}
            />
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
