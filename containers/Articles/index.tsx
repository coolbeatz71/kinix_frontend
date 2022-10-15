import React, { FC, Fragment, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { IArticle } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';
import { CONTENT_LIMIT, START_PAGE } from '@constants/app';
import getAllArticlesAction from '@redux/articles/all';
import { ALL_ARTICLES_PATH } from '@constants/paths';
import ServerError from '@components/common/ServerError';
import InfiniteScroll from 'react-infinite-scroll-component';
import getPayload from '@helpers/getPayload';
import TagsBar from '@components/layout/TagsBar';
import ArticleList from '@components/common/ArticleList';
import ArticleListSkeleton from '@components/skeleton/ArticleList';
import getUserLikesAction from '@redux/likes/userLikes';
import getArticlesTagsAction from '@redux/articles/tags';
import { EnumTagsContext } from '@constants/tags-context';
import getUserBookmarksAction from '@redux/bookmarks/userBookmarks';
import AlaUneArticleSection from '@components/home/AlaUneArticleSection';
import PopularArticleCarousel from '@components/common/PopularArticleCarousel';
import SubscribeNewsLetter from '@components/common/Cards/Article/SubscribeNewsLetter';

import styles from './index.module.scss';

interface IArticleParams {
    page: number;
    tag?: string;
    limit: number;
    search?: string;
}

const ArticleContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { query, asPath, push } = useRouter();
    const [activeTag, setActiveTag] = useState<string>((query?.tag as string) || 'all');

    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [params, setParams] = useState<IArticleParams>({
        page: START_PAGE,
        limit: CONTENT_LIMIT,
    });

    const {
        data,
        error: errArticles,
        loading: loadingArticles,
    } = useSelector(({ articles: { all } }: IRootState) => all);
    const { data: user } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);
    const { loading: loadingTags, data: tags, error } = useSelector(({ articles: { tags } }: IRootState) => tags);

    useEffect(() => {
        dispatch(getArticlesTagsAction());
    }, [dispatch]);

    useEffect(() => {
        if (user?.id) {
            dispatch(getUserLikesAction());
            dispatch(getUserBookmarksAction());
        }
    }, [dispatch, user?.id]);

    useEffect(() => {
        const { search, tag } = query as IUnknownObject;
        dispatch(getAllArticlesAction({ page: START_PAGE, limit: CONTENT_LIMIT, search, tag })).then((res) => {
            if (res.type === 'articles/all/fulfilled') {
                setIsFirstLoad(false);
                setArticles(getPayload(res).data.articles);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, asPath]);

    const onTagSelect = (tag: string): void => {
        setActiveTag(tag);
        if (tag === 'all') push(ALL_ARTICLES_PATH);
        else {
            push({
                query: { tag },
                pathname: ALL_ARTICLES_PATH,
            });
        }
    };

    const fetchMoreArticles = (params: IArticleParams): void => {
        const { page, limit } = params;
        const { search } = query as IUnknownObject;
        setParams({ limit, page, search });

        dispatch(getAllArticlesAction({ limit, page, search })).then((res) => {
            if (res.type === 'articles/all/fulfilled') {
                setArticles([...articles, ...getPayload(res).data.articles]);
            }
        });
    };

    return (
        <div className={styles.articles}>
            <TagsBar
                error={error}
                loading={loadingTags}
                activeTag={activeTag}
                onTagSelect={onTagSelect}
                context={EnumTagsContext.ARTICLE}
                tags={tags as unknown as string[]}
            />
            {isEmpty(query) && (
                <Fragment>
                    <div className="mt-5">
                        <PopularArticleCarousel />
                    </div>
                    <div className="mt-5">
                        <AlaUneArticleSection canViewAll={false} />
                    </div>
                </Fragment>
            )}

            <div className="mt-5">
                <SubscribeNewsLetter />
            </div>

            <div className="mt-5">
                {errArticles && isFirstLoad ? (
                    <ServerError
                        error={errArticles}
                        onRefresh={() => {
                            const { limit, page } = params;
                            dispatch(getAllArticlesAction({ limit, page }));
                        }}
                    />
                ) : loadingArticles ? (
                    <ArticleListSkeleton size={8} />
                ) : (
                    <InfiniteScroll
                        dataLength={articles?.length}
                        hasMore={articles.length < data?.count}
                        className={isEmpty(articles) ? '' : 'pb-5'}
                        loader={
                            <div className="mt-5">
                                <ArticleListSkeleton />
                            </div>
                        }
                        next={() => {
                            const { limit, page } = params;
                            const { search, tag } = query as IUnknownObject;
                            fetchMoreArticles({ limit, page: page + 1, search, tag });
                        }}
                    >
                        <ArticleList articles={articles} myArticles={false} />
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
};

export default ArticleContainer;
