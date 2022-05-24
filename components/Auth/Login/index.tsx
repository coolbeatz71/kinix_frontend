import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Form, Input } from 'antd';
import AuthModal from '@components/common/Modals/AuthModal';
import FloatTextInput from '@components/common/TextInput';
import SocialLogin from '../SocialLogin';
import emailUserNameValidator, { passwordValidator } from './validation';

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

interface ILoginProps {
    open: boolean;
    openSignUp: () => void;
    onCloseClick: () => void;
    openForgotPassword: () => void;
}

const btnStyles = `d-flex align-items-center justify-content-center`;

const LoginModal: FC<ILoginProps> = ({ open, openSignUp, onCloseClick, openForgotPassword }) => {
    const { t } = useTranslation();

    const onSubmit = () => {
        console.log('submit');
    };

    const login = t('login');
    const password = t('password');
    const emailUserName = t('emailUsername');
    const forgotPassword = t('forgotPassword');
    const alreadyHaveAccount = t('alreadyHaveAccount');

    return (
        <AuthModal title={login} open={open} onCloseClick={onCloseClick}>
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
                        <Password size="large" visibilityToggle={false} />
                    </FloatTextInput>
                </Item>

                <Button block size="large" type="primary" htmlType="submit" className={`mt-2 ${btnStyles}`}>
                    {login}
                </Button>

                <div className="mt-4">
                    <Button block type="text" className={`mb-1 ${styles.loginForm__footer__btn}`} onClick={openSignUp}>
                        {alreadyHaveAccount}
                    </Button>

                    <Button
                        block
                        type="text"
                        ghost
                        className={styles.loginForm__footer__btn}
                        onClick={openForgotPassword}
                    >
                        {forgotPassword}
                    </Button>
                </div>
            </Form>
        </AuthModal>
    );
};

export default LoginModal;
