import React, { FC } from 'react';
import { truncate } from 'lodash';

import { Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

const { Title, Paragraph, Text } = Typography;

const title = `"Un artiste est-il obligé d'avoir une direction artistique ?" - La Récré feat Yasmine La
D.A`;
const description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat ullam sequi excepturi
a tempora enim magnam nesciunt suscipit. Ratione unde quis magni, porro cupiditate
molestiae itaque suscipit maiores aliquid ex!`;

const MainArticle: FC = () => {
    return (
        <div className={styles.mainArticle}>
            <div className={styles.mainArticle__cover}>
                <img alt="example" src={`https://picsum.photos/1024/300?random`} />
            </div>
            <div className={styles.mainArticle__content} data-content>
                <div className={styles.mainArticle__content__header}>
                    <Text data-text="header">
                        {truncate('By Redaction', {
                            length: 90,
                        })}
                    </Text>
                    <Text data-text="header" className="d-flex align-items-center">
                        <ClockCircleOutlined />
                        &nbsp; 1 hour ago
                    </Text>
                </div>
                <div className={styles.mainArticle__content__text}>
                    <Title level={1} data-text="title">
                        {truncate(title, {
                            length: 90,
                        })}
                    </Title>
                    <Paragraph data-text="description">
                        {truncate(description, {
                            length: 250,
                        })}
                    </Paragraph>
                </div>
            </div>
        </div>
    );
};

export default MainArticle;
