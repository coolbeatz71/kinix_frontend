import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Form, Input } from 'antd';
import SocialLogin from '../SocialLogin';
import { IRootState } from 'redux/reducers';
import { useAppDispatch } from 'redux/store';
import { ILoginData } from '@interfaces/auth';
import { BTN_STYLES } from '@constants/styles';
import { IUnknownObject } from '@interfaces/app';
import AuthModal from '@components/modal/AuthModal';
import { CHECK_CONFIRM_EMAIL } from '@constants/api';
import AccountConfirmation from '../AccountConfirmation';
import { EnumAuthContext } from '@constants/auth-context';
import FloatTextInput from '@components/common/TextInput';
import { showAuthDialogAction } from 'redux/auth/showDialog';
import loginAction, { resetLoginAction } from 'redux/auth/login';
import emailUserNameValidator, { passwordValidator } from './validation';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

const LoginModal: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [currentCredential, setCurrentCredential] = useState<string>('');
    const { error, loading } = useSelector(({ auth: { login } }: IRootState) => login);
    const { isOpen, context } = useSelector(({ auth: { dialog } }: IRootState) => dialog);

    useEffect(() => {
        if (isOpen) resetLoginAction()(dispatch);
    }, [dispatch, isOpen]);

    const onSubmit = (formValues: ILoginData): void => {
        const { credential, password } = formValues;
        dispatch(loginAction({ data: { credential, password }, dispatch })).then((res) => {
            if (res.type === 'auth/login/fulfilled') onCloseLogin();
            if (res.type === 'auth/login/rejected') setCurrentCredential(credential);
        });
    };

    const openLogin = isOpen && context === EnumAuthContext.LOGIN;
    const onOpenSignUp = (): void => {
        showAuthDialogAction({
            isOpen: true,
            context: EnumAuthContext.SIGNUP,
        })(dispatch);
    };
    const onCloseLogin = (): void => {
        showAuthDialogAction({
            isOpen: false,
            context: EnumAuthContext.LOGIN,
        })(dispatch);
    };
    const onOpenForgotPassword = (): void => {
        showAuthDialogAction({
            isOpen: true,
            context: EnumAuthContext.FORGOT_PASSWORD,
        })(dispatch);
    };

    const login = t('login');
    const password = t('password');
    const emailUserName = t('emailUserName');
    const forgotPassword = t('forgotPassword');
    const dontHaveAccount = t('dontHaveAccount');

    return (
        <AuthModal title={login} open={openLogin} onCloseClick={onCloseLogin}>
            {(error as IUnknownObject)?.code === CHECK_CONFIRM_EMAIL ? (
                <AccountConfirmation credential={currentCredential} onCloseModal={onCloseLogin} />
            ) : (
                <Form size="large" name="user_login" className={styles.loginForm} layout="vertical" onFinish={onSubmit}>
                    <SocialLogin context={EnumAuthContext.LOGIN} onCloseModal={onCloseLogin} />

                    <Divider className="my-2 py-2">{t('or')}</Divider>

                    <Item
                        name="credential"
                        validateTrigger={['onSubmit', 'onBlur']}
                        rules={emailUserNameValidator(emailUserName)}
                    >
                        <FloatTextInput label={emailUserName} placeholder={emailUserName} required>
                            <Input size="large" />
                        </FloatTextInput>
                    </Item>

                    <Item name="password" validateTrigger={['onSubmit', 'onBlur']} rules={passwordValidator(password)}>
                        <FloatTextInput label={password} placeholder={password} required>
                            <Password size="large" visibilityToggle />
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
                        {login}
                    </Button>
                    <div className="mt-4">
                        <Button
                            block
                            type="text"
                            onClick={onOpenSignUp}
                            className={`mb-1 ${styles.loginForm__footer__btn}`}
                        >
                            {dontHaveAccount}
                        </Button>

                        <Button
                            block
                            type="text"
                            onClick={onOpenForgotPassword}
                            className={styles.loginForm__footer__btn}
                        >
                            {forgotPassword}
                        </Button>
                    </div>
                </Form>
            )}
        </AuthModal>
    );
};

export default LoginModal;
