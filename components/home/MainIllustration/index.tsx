import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { YoutubeFilled } from 'icons';
import { useTranslation } from 'react-i18next';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Grid from 'antd/lib/grid';
import Button from 'antd/lib/button';
import Carousel from 'antd/lib/carousel';
import Typography from 'antd/lib/typography';

import useDarkLight from '@hooks/useDarkLight';
import { IUnknownObject } from 'interfaces/app';
import { YOUTUBE_URL } from '@constants/social';

const DynamicLottieAnimation = dynamic(() => import('@components/common/LottieAnimation'));

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const HomeIllustration: FC = () => {
    const { md } = useBreakpoint();
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const [animationData, setAnimationData] = useState<IUnknownObject[]>([]);

    useEffect(() => {
        const importAnimationJSON = async (): Promise<void> => {
            const [music, office, podcast] = await Promise.all([
                import('public/lottie/listen_music_anim.json'),
                import('public/lottie/listen_office_anim.json'),
                import('public/lottie/listen_podcast_anim.json'),
            ]);

            setAnimationData([music.default, office.default, podcast.default]);
        };

        importAnimationJSON();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            <Button
                                danger
                                block={!md}
                                size="large"
                                type="primary"
                                icon={<YoutubeFilled />}
                                onClick={() => window?.open(YOUTUBE_URL, '_blank')}
                            >
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
                            {isEmpty(animationData) ? (
                                <Image
                                    quality={1}
                                    width={512}
                                    height={512}
                                    layout="intrinsic"
                                    src="/lottie-placeholder-vector.svg"
                                />
                            ) : (
                                animationData.map((animation, i) => (
                                    <DynamicLottieAnimation
                                        key={i}
                                        width="512px"
                                        height="512px"
                                        animation={animation}
                                    />
                                ))
                            )}
                        </Carousel>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default HomeIllustration;
