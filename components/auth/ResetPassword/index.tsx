import { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { BTN_STYLES } from '@constants/styles';
import AuthModal from '@components/modal/AuthModal';
import getNotification from '@helpers/getNotification';
import { EnumAuthContext } from '@constants/auth-context';
import FloatTextInput from '@components/common/TextInput';
import { showAuthDialogAction } from '@redux/auth/showDialog';
import otpValidator from '@components/auth/AccountConfirmation/validator';
import resetPasswordAction, { resetResetPasswordAction } from '@redux/auth/resetPassword';
import { newPasswordMatchValidator, newPasswordValidator } from '@components/form/ChangePassword/validator';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));

import styles from './index.module.scss';

const { Password } = Input;
const { Item, useForm } = Form;

const ResetPasswordModal: FC = () => {
    const [form] = useForm();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { isOpen, context } = useSelector(({ auth: { dialog } }: IRootState) => dialog);
    const { data } = useSelector(({ auth: { forgotPassword } }: IRootState) => forgotPassword);
    const { error, loading } = useSelector(({ auth: { resetPassword } }: IRootState) => resetPassword);

    const openResetPassword = isOpen && context === EnumAuthContext.RESET_PASSWORD;

    useEffect(() => {
        if (isOpen) resetResetPasswordAction()(dispatch);
    }, [dispatch, isOpen]);

    const onCloseResetPassword = (): void => {
        showAuthDialogAction({
            isOpen: false,
            context: EnumAuthContext.RESET_PASSWORD,
        })(dispatch);
    };

    const onOpenLoginModal = (): void => {
        showAuthDialogAction({
            isOpen: true,
            context: EnumAuthContext.LOGIN,
        })(dispatch);
    };

    const onSubmit = (formData: { otp: string; newPassword: string }): void => {
        const { otp, newPassword } = formData;
        dispatch(resetPasswordAction({ otp, newPassword, email: data?.email })).then((res) => {
            if (res.type === 'auth/resetPassword/fulfilled') {
                form.resetFields();
                onOpenLoginModal();
                getNotification('success', getPayload(res).message);
            }
        });
    };

    const reset = t('reset');
    const newPassword = t('newPassword');
    const confNewPassword = t('confNewPassword');
    const resetPassword = t('resetPasswordTitle');
    const rememberPassword = t('rememberPassword');

    return (
        <AuthModal title={resetPassword} open={openResetPassword} onCloseClick={onCloseResetPassword}>
            <Form
                size="large"
                layout="vertical"
                onFinish={onSubmit}
                name="reset_password"
                className={styles.resetPassword}
            >
                <Item name="otp" validateTrigger={['onSubmit', 'onBlur']} rules={otpValidator(t('otp'))}>
                    <FloatTextInput label={t('otp')} placeholder={t('otp')} required>
                        <Input maxLength={6} />
                    </FloatTextInput>
                </Item>

                <Item
                    name="newPassword"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={newPasswordValidator(newPassword)}
                >
                    <FloatTextInput label={newPassword} placeholder={newPassword} required>
                        <Password visibilityToggle autoComplete="new-password" />
                    </FloatTextInput>
                </Item>

                <Item
                    name="confNewPassword"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={newPasswordMatchValidator(confNewPassword)}
                >
                    <FloatTextInput label={confNewPassword} placeholder={confNewPassword} required>
                        <Password visibilityToggle autoComplete="new-password" />
                    </FloatTextInput>
                </Item>

                <DynamicErrorAlert error={error} showIcon closable banner />

                <Button block type="primary" htmlType="submit" loading={loading} className={`mt-2 ${BTN_STYLES}`}>
                    {reset}
                </Button>

                <Divider className="my-2 py-2">{t('or')}</Divider>

                <Button
                    block
                    type="text"
                    disabled={loading}
                    className={styles.resetPassword__footer__btn}
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

export default ResetPasswordModal;
