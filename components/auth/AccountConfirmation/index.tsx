import React, { FC } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import FloatTextInput from '@components/common/TextInput';

import styles from './index.module.scss';
import otpValidator from './validator';

const { Item } = Form;
const { Text } = Typography;

export interface IAccountConfirmationProps {
    email: string;
}

const AccountConfirmation: FC<IAccountConfirmationProps> = ({ email }) => {
    const { t } = useTranslation();

    const onSubmit = (formValues: { otp: string }): void => {
        const { otp } = formValues;
        console.log(otp, email);
        // dispatch(signUpAction({ userName, email, password })).then((res) => {
        //     if (res.type === 'auth/signup/fulfilled') {
        //         setCanVerify(true);
        //     }
        // });
    };

    return (
        <div className={styles.accountConf}>
            <Text className="text-center">
                <strong>{t('confirmationEmailSent')}</strong>
            </Text>
            <Text className="text-center">{t('enterVerificationCode')}</Text>
            <br />
            <Form size="large" name="account_confirmation" layout="vertical" onFinish={onSubmit}>
                <Item name="otp" validateTrigger={['onSubmit', 'onBlur']} rules={otpValidator(t('otp'))}>
                    <FloatTextInput label={t('otp')} placeholder={t('otp')} required>
                        <Input size="large" />
                    </FloatTextInput>
                </Item>

                <Row justify="space-between" align="middle">
                    <Col>
                        <Button size="large" type="primary" htmlType="submit">
                            {t('confirm')}
                        </Button>
                    </Col>
                    <Col>
                        <Button size="large">{t('resentOtp')}</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AccountConfirmation;
