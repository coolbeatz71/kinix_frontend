import React, { FC, useEffect, useState, Fragment } from 'react';
import { Button, Col, Form, Input, notification, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import otpValidator from './validator';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import ErrorAlert from '@components/common/ErrorAlert';
import FloatTextInput from '@components/common/TextInput';
import confirmAccountAction, { resetConfirmAccountAction } from '@redux/auth/confirm';
import resendOTPAction, { resetResendOTPAction } from '@redux/auth/resentOtp';

import styles from './index.module.scss';

const { Item } = Form;
const { Text, Title } = Typography;

export interface IAccountConfirmationProps {
    credential: string;
    onCloseModal: () => void;
}

const AccountConfirmation: FC<IAccountConfirmationProps> = ({ credential, onCloseModal }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [onSuccess, setOnSuccess] = useState(false);
    const {
        data: dataConfirm,
        error: errConfirm,
        loading: loadConfirm,
    } = useSelector(({ auth: { confirm } }: IRootState) => confirm);
    const { error: errResendOtp, loading: loadResendOtp } = useSelector(
        ({ auth: { resendOtp } }: IRootState) => resendOtp,
    );

    const error = errConfirm || errResendOtp;

    const onSubmit = (formValues: { otp: string }): void => {
        const { otp } = formValues;
        dispatch(confirmAccountAction({ data: { credential, otp }, dispatch })).then((res) => {
            if (res.type === 'auth/confirm/fulfilled') setOnSuccess(true);
        });
    };

    const onResendOtp = (): void => {
        dispatch(resendOTPAction({ credential })).then((res) => {
            if (res.type === 'auth/resendOtp/fulfilled') {
                notification.success({
                    key: 'success',
                    placement: 'topRight',
                    message: 'Confirmation',
                    description: getPayload(res.payload).message,
                });
            }
        });
    };

    useEffect(() => {
        resetResendOTPAction()(dispatch);
        resetConfirmAccountAction()(dispatch);
    }, [dispatch]);

    return (
        <div className={styles.accountConf}>
            {onSuccess ? (
                <Fragment>
                    <Title level={5} className="text-center fw-medium">
                        {dataConfirm.message}
                    </Title>
                    <div className="d-flex justify-content-center">
                        <Button onClick={onCloseModal}>OK</Button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <Text className="text-center">
                        <strong>{t('confirmationEmailSent')}</strong>
                    </Text>
                    <Text className="text-center">{t('enterVerificationCode')}</Text>
                    <br />

                    <ErrorAlert error={error} showIcon closable banner />

                    <Form size="large" name="account_confirmation" layout="vertical" onFinish={onSubmit}>
                        <Item name="otp" validateTrigger={['onSubmit', 'onBlur']} rules={otpValidator(t('otp'))}>
                            <FloatTextInput label={t('otp')} placeholder={t('otp')} required>
                                <Input size="large" maxLength={6} />
                            </FloatTextInput>
                        </Item>

                        <Row justify="space-between" align="middle" className="mb-3">
                            <Col>
                                <Button size="large" type="primary" htmlType="submit" loading={loadConfirm}>
                                    {t('confirm')}
                                </Button>
                            </Col>
                            <Col>
                                <Button size="large" onClick={onResendOtp} loading={loadResendOtp}>
                                    {t('resentOtp')}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Fragment>
            )}
        </div>
    );
};

export default AccountConfirmation;
