import React from 'react';
import { Carousel, Col, Row } from 'antd';
import styles from './index.module.scss';

const AdsCarousel = () => {
    return (
        <div className={styles.adsCarousel}>
            <Carousel autoplay speed={3200} centerMode variableWidth>
                <div style={{ width: '100%' }}>
                    <Row justify="space-between">
                        <Col span={12} className={styles.adsCarousel__left}></Col>
                        <Col span={12} className={styles.adsCarousel__right}>
                            <img src="https://picsum.photos/1024/1024?random=1" alt="" />
                        </Col>
                    </Row>
                </div>
            </Carousel>
        </div>
    );
};

export default AdsCarousel;
