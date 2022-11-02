import React, { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Carousel from 'nuka-carousel';
import { useSelector } from 'react-redux';
import { IArticle } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getPopularArticlesAction from '@redux/articles/popular';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));
const DynamicMainArticle = dynamic(() => import('@components/cards/Article/MainArticle'));
const DynamicMainArticleSkeleton = dynamic(() => import('@components/skeleton/MainArticle'));

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
                <DynamicErrorAlert error={error} showIcon closable banner />
            ) : loading ? (
                <DynamicMainArticleSkeleton />
            ) : (
                <Carousel dragging wrapAround slidesToShow={1} cellSpacing={10} slidesToScroll={1} cellAlign="left">
                    {data.map((article) => (
                        <DynamicMainArticle article={article as IArticle} key={article.id} />
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default PopularArticleCarousel;
