import { FC, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import Carousel from 'nuka-carousel';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IAds } from '@interfaces/api';
import { PRIMARY } from '@constants/styles';
import SliderContent from '../SliderContent';
import { IRootState } from '@redux/reducers';
import getAllAdsAction from '@redux/ads/all';
import { useAppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';
import { getBgColor } from '@helpers/getBgColor';

import styles from './../index.module.scss';

const AdsCarousel: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { data } = useSelector(({ ads: { all } }: IRootState) => all);

    useEffect(() => {
        dispatch(getAllAdsAction());
    }, [dispatch]);

    const defaultSlide: IAds[] | IUnknownObject[] = [
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
