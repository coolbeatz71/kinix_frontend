import React, { FC, useEffect } from 'react';
import { isEmpty } from 'lodash';
import Carousel from 'nuka-carousel';
import { getBgColor } from '@helpers/getBgColor';
import { useSelector } from 'react-redux';
import SliderContent from './SliderContent';
import { IRootState } from '@redux/reducers';
import { useTranslation } from 'react-i18next';
import getAllAdsAction from '@redux/ads/getAll';
import { useAppDispatch } from '@redux/store';
import { IAdsData } from '@interfaces/api';
import { IUnknownObject } from '@interfaces/app';
import { PRIMARY } from '@constants/colors';

import styles from './index.module.scss';

const AdsCarousel: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { data } = useSelector(({ ads: { all } }: IRootState) => all);

    useEffect(() => {
        dispatch(getAllAdsAction());
    }, [dispatch]);

    const defaultSlide: IAdsData[] | IUnknownObject[] = [
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
        <div className={styles.adsCarousel}>
            <Carousel wrapAround withoutControls autoplay autoplayInterval={25000} transitionMode="fade">
                {[...defaultSlide, ...data].map((slider) => (
                    <div key={slider.title}>
                        <SliderContent
                            body={slider.body}
                            image={slider.image}
                            title={slider.title}
                            legend={slider.legend}
                            subTitle={slider.subTitle}
                            isAppAds={slider.isAppAds}
                            redirectUrl={slider.redirectUrl}
                            hasButton={!isEmpty(slider.redirectUrl)}
                            bgColor={slider.bgColor || getBgColor(slider.body)}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default AdsCarousel;
