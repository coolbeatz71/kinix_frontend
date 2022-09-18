import React, { FC } from 'react';
import Carousel from 'nuka-carousel';
import SliderContent from './SliderContent';

import styles from './index.module.scss';

export const sliders = [
    {
        tag: 'Brand news',
        title: 'ALBUM "Mother of Brooklyn" on stores now',
        subtitle: 'Release Date 12th january 2022',
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur rerum optio
        consectetur expedita, cumque, tenetur doloribus velit recusandae non quis aspernatur.
        Facilis eligendi assumenda incidunt minus laudantium odio, iste veniam.`,
        hasButton: true,
        link: 'https://www.google.com',
        bgColor: '#6C4586',
        imgSrc: '',
    },
    {
        tag: 'Brand news',
        title: 'ALBUM "Mother of Brooklyn" on stores now',
        subtitle: 'Release Date 12th january 2022',
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur rerum optio
        consectetur expedita, cumque, tenetur doloribus velit recusandae non quis aspernatur.
        Facilis eligendi assumenda incidunt minus laudantium odio, iste veniam.`,
        hasButton: true,
        link: 'https://www.google.com',
        bgColor: '#a01a58',
        imgSrc: '',
    },
    {
        tag: 'Brand news',
        title: 'ALBUM "Mother of Brooklyn" on stores now',
        subtitle: 'Release Date 12th january 2022',
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur rerum optio
        consectetur expedita, cumque, tenetur doloribus velit recusandae non quis aspernatur.
        Facilis eligendi assumenda incidunt minus laudantium odio, iste veniam.`,
        hasButton: true,
        link: 'https://www.google.com',
        bgColor: '#0582ca',
        imgSrc: '',
    },
    {
        tag: 'Brand news',
        title: 'ALBUM "Mother of Brooklyn" on stores now',
        subtitle: 'Release Date 12th january 2022',
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur rerum optio
        consectetur expedita, cumque, tenetur doloribus velit recusandae non quis aspernatur.
        Facilis eligendi assumenda incidunt minus laudantium odio, iste veniam.`,
        hasButton: true,
        link: 'https://www.google.com',
        bgColor: '#0B5A49',
        imgSrc: '',
    },
    {
        tag: 'Brand news',
        title: 'ALBUM "Mother of Brooklyn" on stores now',
        subtitle: 'Release Date 12th january 2022',
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur rerum optio
        consectetur expedita, cumque, tenetur doloribus velit recusandae non quis aspernatur.
        Facilis eligendi assumenda incidunt minus laudantium odio, iste veniam.`,
        hasButton: true,
        link: 'https://www.google.com',
        bgColor: '#023047',
        imgSrc: '',
    },
];

const AdsCarousel: FC = () => {
    return (
        <div className={styles.adsCarousel}>
            <Carousel wrapAround withoutControls>
                {sliders.map((slider, i) => (
                    <div key={slider.title}>
                        <SliderContent
                            hasButton
                            tag={slider.tag}
                            link={slider.link}
                            desc={slider.desc}
                            title={slider.title}
                            bgColor={slider.bgColor}
                            subtitle={slider.subtitle}
                            imgSrc={`https://picsum.photos/1024/1024?random=${i + 1}`}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default AdsCarousel;
