import React, { FC, useEffect } from 'react';
import Carousel from 'nuka-carousel';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { IArticle } from '@interfaces/api';
import ErrorAlert from '../ErrorAlert';
import getPopularArticlesAction from '@redux/articles/popular';
import MainArticle from '@components/common/Cards/Article/MainArticle';
import MainArticleSkeleton from '@components/skeleton/MainArticle';

import styles from './index.module.scss';

const PopularArticleCarousel: FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error, data } = useSelector(({ articles: { popular } }: IRootState) => popular);

    useEffect(() => {
        dispatch(getPopularArticlesAction());
    }, [dispatch]);
    return (
        <div className={styles.articleCarousel}>
            {error ? (
                <ErrorAlert error={error} showIcon closable banner />
            ) : loading ? (
                <MainArticleSkeleton />
            ) : (
                <Carousel dragging wrapAround slidesToShow={1} cellSpacing={10} slidesToScroll={1} cellAlign="left">
                    {data.map((article) => (
                        <MainArticle article={article as IArticle} key={article.id} />
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default PopularArticleCarousel;
