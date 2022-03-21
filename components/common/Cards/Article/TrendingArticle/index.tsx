import React, { FC } from 'react';
import useDarkLight from '@hooks/useDarkLight';
import { Card, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { truncate } from 'lodash';

const { Title, Paragraph, Text } = Typography;

export interface ITrendingArticleProps {
    size?: number;
}

const title = `"Un artiste est-il obligé d'avoir une direction artistique ?" - La Récré feat Yasmine La
D.A`;
const description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat ullam sequi excepturi
a tempora enim magnam nesciunt suscipit. Ratione unde quis magni, porro cupiditate
molestiae itaque suscipit maiores aliquid ex!`;

const TrendingArticleCard: FC<ITrendingArticleProps> = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.trendingArticleCard}>
            <Card bordered={false} hoverable>
                <div className={styles.trendingArticleCard__header}>
                    <div className="d-flex justify-content-between">
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
                </div>
                <div className={styles.trendingArticleCard__content}>
                    <Title level={5} data-text="title">
                        {truncate(title, {
                            length: 50,
                        })}
                    </Title>
                    <Paragraph data-text="description">
                        {truncate(description, {
                            length: 102,
                        })}
                    </Paragraph>
                </div>
            </Card>
        </div>
    );
};

export default TrendingArticleCard;
