import React, { FC } from 'react';
import useDarkLight from '@hooks/useDarkLight';
import { Card, Col, Row, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { truncate } from 'lodash';

const { Title, Text } = Typography;

export interface IRelatedArticleProps {
    size?: number;
}

const title = `"Un artiste est-il obligé d'avoir une direction artistique ?" - La Récré feat Yasmine La
D.A`;

const RelatedArticleCard: FC<IRelatedArticleProps> = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.relatedArticleCard}>
            <Card bordered={false} hoverable>
                <Row justify="space-between">
                    <Col span={7} className={styles.relatedArticleCard__cover}>
                        <img src="https://picsum.photos/512/512?random" alt="" />
                    </Col>
                    <Col span={17} data-body>
                        <div className={styles.relatedArticleCard__header}>
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
                        <div className={styles.relatedArticleCard__content}>
                            <Title level={5} data-text="title">
                                {truncate(title, {
                                    length: 100,
                                })}
                            </Title>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default RelatedArticleCard;
