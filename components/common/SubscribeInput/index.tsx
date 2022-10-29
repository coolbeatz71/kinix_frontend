import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';

import styles from './index.module.scss';

const { Item } = Form;
const { Group } = Input;

const SubscribeInput: FC = () => {
    return (
        <Form size="large" name="subscribe_input" className={styles.subscribeInput} layout="vertical">
            <Item name="email" required>
                <Group>
                    <Input placeholder="Enter your email" />
                    <Button htmlType="submit">Subscribe</Button>
                </Group>
            </Item>
        </Form>
    );
};

export default SubscribeInput;
