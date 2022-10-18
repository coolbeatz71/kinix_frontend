import React, { FC } from 'react';
import { Row, Col, Typography, Button, Carousel, Grid } from 'antd';
import { useTranslation } from 'react-i18next';
import { YoutubeFilled } from 'icons';
import Lottie, { Options } from 'react-lottie';
import { IUnknownObject } from 'interfaces/app';
import useDarkLight from '@hooks/useDarkLight';

import music from 'public/listen_music_anim.json';
import office from 'public/listen_office_anim.json';
import podcast from 'public/listen_podcast_anim.json';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const animationList: IUnknownObject[] = [music, office, podcast];

const HomeIllustration: FC = () => {
    const { md } = useBreakpoint();
    const { value } = useDarkLight();
    const { t } = useTranslation();

    const defaultOptions = (animationData: IUnknownObject): Options => ({
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    });

    return (
        <div className={styles.illustration} data-theme={value}>
            <Row justify="space-between">
                <Col xs={24} sm={24} md={10} className={styles.illustration__legend}>
                    <Title className={styles.illustration__legend__text}>
                        {t('mainLegendOne')} {t('mainLegendTwo')}
                    </Title>
                    <Row
                        align="middle"
                        justify={md ? 'space-between' : 'center'}
                        className={styles.illustration__legend__subscribe}
                    >
                        <Col xs={24} sm={24} md={16}>
                            <Text className={styles.illustration__legend__subscribe__text}>{t('subscribeLegend')}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={8} className="d-flex justify-content-end">
                            <Button type="primary" block={!md} size="large" danger icon={<YoutubeFilled />}>
                                {t('subscribe')}
                            </Button>
                        </Col>
                    </Row>
                </Col>
                {md && (
                    <Col xs={24} sm={24} md={14}>
                        <Carousel
                            autoplay
                            speed={2000}
                            dots={false}
                            effect="fade"
                            autoplaySpeed={1000 * 60}
                            className={styles.illustration__slider}
                        >
                            {animationList.map((animation, i) => (
                                <Lottie key={i} width={512} height={512} options={defaultOptions(animation)} />
                            ))}
                        </Carousel>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default HomeIllustration;
