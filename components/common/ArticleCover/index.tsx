import React, { FC } from 'react';
import { Col, Row, Typography } from 'antd';
import CustomIcon from '@components/common/CustomIcon';
import { HeartOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
const { Title, Text } = Typography;

export interface IArticleCoverProps {
    myLike?: boolean;
}

const ArticleCover: FC<IArticleCoverProps> = ({ myLike = true }) => {
    return (
        <div className={styles.articleCover}>
            <div className={styles.articleCover__overlay}>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </div>
            <Row justify="space-between" align="middle" className={styles.articleCover__content}>
                <Col span={3} className={styles.articleCover__content__like}>
                    {myLike ? (
                        <CustomIcon type="liked-heart" data-is-my-like={myLike} />
                    ) : (
                        <HeartOutlined data-is-my-like={myLike} />
                    )}
                    <Text data-likes-value>12.3k</Text>
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
