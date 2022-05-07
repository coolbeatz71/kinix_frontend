import React, { FC } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import AuthModal from '@components/common/Modals/AuthModal';
import FloatTextInput from '@components/common/TextInput';
import SocialLogin from '../SocialLogin';

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
    const onSubmit = () => {
        console.log('submit');
    };

    return (
        <AuthModal title="Login" open={open} onCloseClick={onCloseClick}>
            <Form size="large" name="user_login" className={styles.loginForm} layout="vertical" onFinish={onSubmit}>
                <SocialLogin
                    googleClassName={`mb-2 ${btnStyles} ${styles.loginForm__social__google}`}
                    facebookClassName={`${btnStyles} ${styles.loginForm__social__facebook}`}
                />

                <Divider className="my-4 py-2">OR</Divider>

                <Item name="email" validateTrigger={['onSubmit', 'onBlur']}>
                    <FloatTextInput label="Email or Username" placeholder="Email or Username" required>
                        <Input size="large" />
                    </FloatTextInput>
                </Item>

                <Item name="password" validateTrigger={['onSubmit', 'onBlur']}>
                    <FloatTextInput label="Password" placeholder="Password" required>
                        <Password size="large" visibilityToggle={false} />
                    </FloatTextInput>
                </Item>

                <Button block size="large" type="primary" htmlType="submit" className={`mt-2 ${btnStyles}`}>
                    Login
                </Button>

                <div className="mt-4">
                    <Button block type="text" className={`mb-1 ${styles.loginForm__footer__btn}`} onClick={openSignUp}>
                        Do not have an account? Sign Up
                    </Button>

                    <Button
                        block
                        type="text"
                        ghost
                        className={styles.loginForm__footer__btn}
                        onClick={openForgotPassword}
                    >
                        Forgot Password?
                    </Button>
                </div>
            </Form>
        </AuthModal>
    );
};

export default LoginModal;
