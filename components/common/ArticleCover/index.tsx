import React, { FC } from 'react';
import { Col, Row, Typography } from 'antd';
import StarRatingComponent from 'react-star-rating-component';
import { LIGHT } from '@constants/colors';
import styles from './index.module.scss';

const { Title, Text } = Typography;

const ArticleCover: FC = () => {
    return (
        <div className={styles.articleCover}>
            <div className={styles.articleCover__overlay}>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </div>
            <Row justify="space-between" align="middle" className={styles.articleCover__content}>
                <Col span={3} className={styles.articleCover__content__rating}>
                    <Title data-title>4.4</Title>
                    <StarRatingComponent emptyStarColor={LIGHT} name="video-rate" starCount={5} value={3} />
                    <Text data-read>10 min read</Text>
                </Col>
                <Col span={21} className={styles.articleCover__content__title}>
                    <Title>
                        Artificial Intelligence in our homes For the next years. Artificial Intelligence in our homes
                    </Title>
                </Col>
            </Row>
        </div>
    );
};

export default ArticleCover;
