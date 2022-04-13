import React, { FC } from 'react';
import { Col, Grid, Row, Typography } from 'antd';
import CustomIcon from '@components/common/CustomIcon';
import { HeartOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import ArticleAction from '../Actions/ArticleAction';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
export interface IArticleCoverProps {
    myLike?: boolean;
}

const ArticleCover: FC<IArticleCoverProps> = ({ myLike = true }) => {
    const { lg } = useBreakpoint();

    return (
        <div className={styles.articleCover}>
            <div className={styles.articleCover__overlay}>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            </div>
            <Row justify="space-between" align="middle" className={styles.articleCover__content}>
                <Col md={24} lg={3} className={styles.articleCover__content__like}>
                    {lg && (
                        <>
                            {myLike ? (
                                <CustomIcon type="liked-heart" data-is-my-like={myLike} />
                            ) : (
                                <HeartOutlined data-is-my-like={myLike} />
                            )}
                            <Text data-likes-value>12.3k</Text>
                            <Text data-read>10 min read</Text>
                        </>
                    )}
                </Col>
                <Col md={24} lg={21} className={styles.articleCover__content__title}>
                    <Title>
                        Artificial Intelligence in our homes For the next years. Artificial Intelligence in our homes
                    </Title>
                </Col>
                {!lg && (
                    <Row className={styles.articleCover__content__action}>
                        <Col span={16} className={styles.articleCover__content__action__left}>
                            <ArticleAction />
                        </Col>
                        <Col span={8} className={styles.articleCover__content__action__right}>
                            <Text data-read>10 min read</Text>
                        </Col>
                    </Row>
                )}
            </Row>
        </div>
    );
};

export default ArticleCover;
