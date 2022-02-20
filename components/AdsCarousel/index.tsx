import React, { FC } from 'react';
import { Carousel } from 'antd';
import styles from './index.module.scss';
import SliderContent from './SliderContent';

const sliders = [
    {
        tag: 'Brand news',
        title: 'ALBUM "Mother of Brooklyn" on stores now',
        subtitle: 'Release Date 12th january 2022',
        desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur rerum optio
        consectetur expedita, cumque, tenetur doloribus velit recusandae non quis aspernatur.
        Facilis eligendi assumenda incidunt minus laudantium odio, iste veniam.`,
        hasButton: true,
        link: 'https://www.google.com',
        bgColor: '#6d597a',
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
        bgColor: '#0db39e',
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
    },
];

const AdsCarousel: FC = () => {
    return (
        <div className={styles.adsCarousel}>
            <Carousel autoplay dots effect="fade">
                {sliders.map((slider) => (
                    <SliderContent
                        hasButton
                        key={slider.title}
                        tag={slider.tag}
                        link={slider.link}
                        title={slider.title}
                        subtitle={slider.subtitle}
                        bgColor={slider.bgColor}
                        desc={slider.desc}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default AdsCarousel;
