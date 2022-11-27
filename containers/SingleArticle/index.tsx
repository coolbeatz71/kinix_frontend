import { FC, Fragment, useEffect } from 'react';

import Grid from 'antd/lib/grid';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { IArticle, IUser } from '@interfaces/api';
import getUserLikesAction from '@redux/likes/userLikes';
import getRelatedArticlesAction from '@redux/articles/related';
import getUserBookmarksAction from '@redux/bookmarks/userBookmarks';

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicArticleBody = dynamic(() => import('@components/articles/ArticleBody'));
const DynamicArticleCover = dynamic(() => import('@components/articles/ArticleCover'));
const DynamicSingleArticleSkeleton = dynamic(() => import('@components/skeleton/SingleArticle'));

const { useBreakpoint } = Grid;

export interface ISingleArticleContainerProps {
    article: IArticle;
}

const SingleArticleContainer: FC<ISingleArticleContainerProps> = ({ article }) => {
    const { lg } = useBreakpoint();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    const { data: user } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);
    const { data: related, error, loading } = useSelector(({ articles: { related } }: IRootState) => related);

    useEffect(() => {
        const { tags, slug } = article as IArticle;
        if (!isEmpty(tags)) dispatch(getRelatedArticlesAction({ slug, tags }));
    }, [dispatch, article]);

    useEffect(() => {
        if (user?.id) {
            dispatch(getUserLikesAction());
            dispatch(getUserBookmarksAction());
        }
    }, [dispatch, user?.id]);

    return (
        <Fragment>
            {error ? (
                <DynamicServerError
                    error={error}
                    onRefresh={() => dispatch(getRelatedArticlesAction({ slug: article?.slug, tags: article?.tags }))}
                />
            ) : loading ? (
                <DynamicSingleArticleSkeleton />
            ) : (
                <div data-theme={value}>
                    <DynamicArticleCover article={article} user={user as IUser} />

                    <div className={lg ? 'mt-5' : 'mt-4'}>
                        <DynamicArticleBody article={article} related={related as IArticle[]} />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default SingleArticleContainer;
