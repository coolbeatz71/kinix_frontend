import React, { FC } from 'react';
import useDarkLight from '@hooks/useDarkLight';
import { Card, Col, Row, Typography } from 'antd';

import styles from './index.module.scss';
import { truncate } from 'lodash';

const { Title, Text } = Typography;

export interface IRelatedVideoProps {
    size?: number;
}

const title = "We Takin' Over - Dj Khaled Ft. T.I, Akon, Rick Ross, Fat Joe, Birdman & Lil Wayne";
const channel = 'Derrière La Caméra';

const RelatedVideoCard: FC<IRelatedVideoProps> = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.relatedVideoCard}>
            <Card bordered={false} hoverable>
                <Row justify="space-between">
                    <Col span={9} className={styles.relatedVideoCard__cover}>
                        <img src="https://picsum.photos/1024/512?random" alt="" />
                    </Col>
                    <Col span={15} data-body>
                        <Title level={5} data-title>
                            {truncate(title, {
                                length: 60,
                            })}
                        </Title>
                        <div className="d-flex flex-column">
                            <Text data-channel>
                                {truncate(channel, {
                                    length: 20,
                                })}
                            </Text>
                            <Text data-subscribers>87.5K subscribers</Text>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default RelatedVideoCard;
