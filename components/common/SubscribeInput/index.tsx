import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const { Item } = Form;
const { Group } = Input;

const SubscribeInput: FC = () => {
    const { t } = useTranslation();

    return (
        <Form size="large" name="subscribe_input" className={styles.subscribeInput} layout="vertical">
            <Item name="email" required>
                <Group>
                    <Input placeholder={t('enterEmail')} />
                    <Button htmlType="submit">{t('subscribe')}</Button>
                </Group>
            </Item>
        </Form>
    );
};

export default SubscribeInput;
