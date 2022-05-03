import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';

import styles from './index.module.scss';

const { Item } = Form;

const SubscribeInput: FC = () => {
    return (
        <Form size="large" name="subscribe_input" className={styles.subscribeInput} layout="vertical">
            <Item name="email" required>
                <Input.Group>
                    <Input size="large" placeholder="Enter your email" />
                    <Button htmlType="submit" size="large">
                        Subscribe
                    </Button>
                </Input.Group>
            </Item>
        </Form>
    );
};

export default SubscribeInput;
