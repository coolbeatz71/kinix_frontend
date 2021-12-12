import React, { FC } from 'react';
import { Row, Col, Typography, Button, Carousel } from 'antd';
import { YoutubeFilled } from '@ant-design/icons';
import Lottie, { Options } from 'react-lottie';
import styles from './index.module.scss';
import { IUnknownObject } from '@type/app';
import useDarkLight from '@hooks/useDarkLight';

import music from 'public/listen_music_anim.json';
import office from 'public/listen_office_anim.json';
import podcast from 'public/listen_podcast_anim.json';

const { Title, Text } = Typography;

const animationList: IUnknownObject[] = [music, office, podcast];

const MainIllustration: FC = () => {
    const { value } = useDarkLight();

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
                <Col span={12} className={styles.illustration__legend}>
                    <Title className={styles.illustration__legend__text}>
                        When words stop coming out,
                        <br /> music pops up
                    </Title>
                    <Row align="middle" justify="space-between" className={styles.illustration__legend__subscribe}>
                        <Col>
                            <Text className={styles.illustration__legend__subscribe__text}>To get the latest news</Text>
                        </Col>
                        <Col>
                            <Button type="primary" size="large" danger icon={<YoutubeFilled />}>
                                Subscribe
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
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
            </Row>
        </div>
    );
};

export default MainIllustration;
