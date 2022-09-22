import React, { FC } from 'react';
import Carousel from 'nuka-carousel';
import { useTranslation } from 'react-i18next';
import MainArticle from '@components/common/Cards/Article/MainArticle';
import { PRIMARY } from '@constants/colors';
import { IUnknownObject } from '@interfaces/app';

import styles from './index.module.scss';

const ArticleCarousel: FC = () => {
    const { t } = useTranslation();
    const defaultSlide: IUnknownObject[] = [
        {
            isAppAds: true,
            bgColor: PRIMARY,
            body: t('adsBody'),
            image: '/phones.png',
            title: t('adsTitle'),
            legend: t('adsLegend'),
            redirectUrl: 'https://www.google.com',
            iosLink: 'https://google.com',
            androidLink: 'https://google.com',
        },
    ];
    return (
        <div className={styles.articleCarousel}>
            <Carousel dragging wrapAround slidesToShow={1} cellSpacing={10} slidesToScroll={1} cellAlign="left">
                {defaultSlide.map((slider) => (
                    <article key={slider.title}>
                        <MainArticle />
                    </article>
                ))}
            </Carousel>
        </div>
    );
};

export default ArticleCarousel;
