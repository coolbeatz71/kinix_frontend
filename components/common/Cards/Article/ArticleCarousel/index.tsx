import { sliders } from '@components/Home/AdsCarousel';
import React, { FC } from 'react';
import Carousel from 'nuka-carousel';

import styles from './index.module.scss';
import MainArticle from '@components/common/Cards/Article/MainArticle';

const ArticleCarousel: FC = () => {
    return (
        <div className={styles.articleCarousel}>
            <Carousel wrapAround dragging slidesToShow={1} slidesToScroll={1} cellSpacing={10} cellAlign="left">
                {sliders.map((slider) => (
                    <article key={slider.title}>
                        <MainArticle />
                    </article>
                ))}
            </Carousel>
        </div>
    );
};

export default ArticleCarousel;
