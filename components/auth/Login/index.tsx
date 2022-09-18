import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Form, Input } from 'antd';
import AuthModal from '@components/common/Modals/AuthModal';
import { useSelector } from 'react-redux';
import FloatTextInput from '@components/common/TextInput';
import SocialLogin from '../SocialLogin';
import emailUserNameValidator, { passwordValidator } from './validation';
import { showAuthDialogAction } from 'redux/auth/showDialog';
import { EnumAuthContext } from '@constants/auth-context';
import { IRootState } from 'redux/reducers';
import loginAction, { resetLoginAction } from 'redux/auth/login';
import { ILoginData } from '@interfaces/auth';
import { useAppDispatch } from 'redux/store';
import ErrorAlert from '@components/common/ErrorAlert';

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

const btnStyles = `d-flex align-items-center justify-content-center`;

const LoginModal: FC = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const { error, loading } = useSelector(({ auth: { login } }: IRootState) => login);
    const { isOpen, context } = useSelector(({ auth: { dialog } }: IRootState) => dialog);

    useEffect(() => {
        if (isOpen) resetLoginAction()(dispatch);
    }, [dispatch, isOpen]);

    const onSubmit = (formValues: ILoginData): void => {
        const { credential, password } = formValues;
        dispatch(loginAction({ data: { credential, password }, dispatch }));
    };

    const openLogin = isOpen && context === EnumAuthContext.LOGIN;
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

    const onOpenSignUp = (): void => {
        showAuthDialogAction({
            isOpen: true,
            context: EnumAuthContext.SIGNUP,
        })(dispatch);
    };

    const login = t('login');
    const password = t('password');
    const emailUserName = t('emailUserName');
    const forgotPassword = t('forgotPassword');
    const dontHaveAccount = t('dontHaveAccount');

    return (
        <AuthModal title={login} open={openLogin} onCloseClick={onCloseLogin}>
            <Form size="large" name="user_login" className={styles.loginForm} layout="vertical" onFinish={onSubmit}>
                <SocialLogin
                    googleClassName={`mb-2 ${btnStyles} ${styles.loginForm__social__google}`}
                    facebookClassName={`${btnStyles} ${styles.loginForm__social__facebook}`}
                />

                <Divider className="my-4 py-2">{t('or')}</Divider>

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

                <ErrorAlert error={error} showIcon closable banner />

                <Button
                    block
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className={`mt-2 ${btnStyles}`}
                >
                    {login}
                </Button>
                <div className="mt-4">
                    <Button
                        block
                        type="text"
                        className={`mb-1 ${styles.loginForm__footer__btn}`}
                        onClick={onOpenSignUp}
                    >
                        {dontHaveAccount}
                    </Button>

                    <Button block type="text" className={styles.loginForm__footer__btn} onClick={onOpenForgotPassword}>
                        {forgotPassword}
                    </Button>
                </div>
            </Form>
        </AuthModal>
    );
};

export default LoginModal;
