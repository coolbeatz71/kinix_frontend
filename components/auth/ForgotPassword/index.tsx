import React, { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button, Divider, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { BTN_STYLES } from '@constants/styles';
import AuthModal from '@components/modal/AuthModal';
import { emailValidator } from '../SignUp/validator';
import getNotification from '@helpers/getNotification';
import { EnumAuthContext } from '@constants/auth-context';
import FloatTextInput from '@components/common/TextInput';
import { showAuthDialogAction } from '@redux/auth/showDialog';
import forgotPasswordAction, { resetForgotPasswordAction } from '@redux/auth/forgotPassword';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));

import styles from './index.module.scss';

const { Item, useForm } = Form;

const ForgotPasswordModal: FC = () => {
    const [form] = useForm();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { isOpen, context } = useSelector(({ auth: { dialog } }: IRootState) => dialog);
    const { error, loading } = useSelector(({ auth: { forgotPassword } }: IRootState) => forgotPassword);

    const openForgotPassword = isOpen && context === EnumAuthContext.FORGOT_PASSWORD;

    useEffect(() => {
        if (isOpen) resetForgotPasswordAction()(dispatch);
    }, [dispatch, isOpen]);

    const onCloseForgotPassword = (): void => {
        showAuthDialogAction({
            isOpen: false,
            context: EnumAuthContext.FORGOT_PASSWORD,
        })(dispatch);
    };

    const onOpenResetPassword = (): void => {
        showAuthDialogAction({
            isOpen: true,
            context: EnumAuthContext.RESET_PASSWORD,
        })(dispatch);
    };

    const onSubmit = (formData: { email: string }): void => {
        const { email } = formData;
        dispatch(forgotPasswordAction({ email })).then((res) => {
            if (res.type === 'auth/forgotPassword/fulfilled') {
                form.resetFields();
                onOpenResetPassword();
                getNotification('success', getPayload(res).message);
            }
        });
    };

    const email = t('email');
    const resetPassword = t('resetPasswordTitle');
    const rememberPassword = t('rememberPassword');
    const forgotPassword = t('forgotPasswordTitle');

    return (
        <AuthModal title={forgotPassword} open={openForgotPassword} onCloseClick={onCloseForgotPassword}>
            <Form
                size="large"
                layout="vertical"
                onFinish={onSubmit}
                name="forgot_password"
                className={styles.forgotPassword}
            >
                <Item name="email" rules={emailValidator()} validateTrigger={['onSubmit', 'onBlur']}>
                    <FloatTextInput label={email} placeholder={email} required>
                        <Input size="large" />
                    </FloatTextInput>
                </Item>

                <DynamicErrorAlert error={error} showIcon closable banner />

                <Button
                    block
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className={`mt-2 ${BTN_STYLES}`}
                >
                    {resetPassword}
                </Button>

                <Divider className="my-2 py-2">{t('or')}</Divider>

                <Button
                    block
                    type="text"
                    disabled={loading}
                    className={styles.forgotPassword__footer__btn}
                    onClick={() => {
                        showAuthDialogAction({ isOpen: true, context: EnumAuthContext.LOGIN })(dispatch);
                    }}
                >
                    {rememberPassword}
                </Button>
            </Form>
        </AuthModal>
    );
};

export default ForgotPasswordModal;
