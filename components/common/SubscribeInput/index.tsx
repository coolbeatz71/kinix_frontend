import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form, Grid, Input, Row } from 'antd';

import styles from './index.module.scss';

const { Item } = Form;
const { useBreakpoint } = Grid;

const SubscribeInput: FC = () => {
    const { md } = useBreakpoint();
    const { t } = useTranslation();

    return (
        <Form size="large" name="subscribe_input" layout="vertical">
            <Row justify="space-between" className={styles.subscribeInput}>
                <Col span={16}>
                    <Item name="email" required>
                        <Input placeholder={t('enterEmail')} />
                    </Item>
                </Col>
                <Col span={8}>
                    <Button htmlType="submit" block={!md}>
                        {t('subscribe')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SubscribeInput;
