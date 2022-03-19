import { sliders } from '@components/Home/AdsCarousel';
import React, { FC } from 'react';
import Carousel from 'nuka-carousel';

import styles from './index.module.scss';

const ArticleCarousel: FC = () => {
    return (
        <div className={styles.mainArticle}>
            <Carousel wrapAround dragging slidesToShow={2} cellSpacing={10} cellAlign="center">
                {sliders.map((slider) => (
                    <article key={slider.title}>
                        <div style={{ width: '100%', height: '100%', background: slider.bgColor }}></div>
                    </article>
                ))}
            </Carousel>
        </div>
    );
};

export default ArticleCarousel;
