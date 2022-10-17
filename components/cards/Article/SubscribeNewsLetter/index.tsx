import React, { FC } from 'react';
import { Row, Col, Typography } from 'antd';
import SubscribeInput from '@components/common/SubscribeInput';

import styles from './index.module.scss';

const { Title, Text } = Typography;

const SubscribeNewsLetter: FC = () => {
    return (
        <div className={styles.subscribeNewsLetter}>
            <Row justify="space-between">
                <Col sm={24} md={24} lg={10}>
                    <Title data-title>Subscribe and Stay Informed</Title>
                    <Text data-desc>
                        Signup for our weekly newsletter to get the latest news, updates and amazing offers delivered
                        directly in your inbox.
                    </Text>
                    <SubscribeInput />
                </Col>
            </Row>
        </div>
    );
};

export default SubscribeNewsLetter;
