import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Grid from 'antd/lib/grid';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

import styles from './index.module.scss';

const { Item } = Form;
const { useBreakpoint } = Grid;

const SubscribeInput: FC = () => {
    const { lg } = useBreakpoint();
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
                    <Button htmlType="submit" block={!lg}>
                        {t('subscribe')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SubscribeInput;
