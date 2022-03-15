import React, { FC } from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import AuthModal from '@components/common/Modals/AuthModal';
import FloatTextInput from '@components/common/TextInput';
import SocialLogin from '../SocialLogin';

import styles from './index.module.scss';
import { EnumAuthContext } from '@constants/auth-context';

const { Item } = Form;
const { Password } = Input;
const { Text, Link } = Typography;

interface ISignUpProps {
    open: boolean;
    openLogin: () => void;
    onCloseClick: () => void;
}

const btnStyles = 'd-flex align-items-center justify-content-center';

const UserAgreement: FC = () => {
    return (
        <Form.Item className={styles.signupForm__userAgreement}>
            <Text className={styles.signupForm__userAgreement__text}>
                By clicking “Create account”, you agree to our{' '}
                <Link href="/user-agreement" target="blank">
                    Terms of service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" target="blank">
                    Privacy policies
                </Link>{' '}
            </Text>
        </Form.Item>
    );
};

const SignUpModal: FC<ISignUpProps> = ({ open, openLogin, onCloseClick }) => {
    return (
        <AuthModal title="Create account" open={open} onCloseClick={onCloseClick}>
            <Form size="large" name="user_signup" className={styles.signupFormForm} layout="vertical">
                <SocialLogin
                    context={EnumAuthContext.SIGNUP}
                    googleClassName={`mb-2 ${btnStyles} ${styles.signupForm__social__google}`}
                    facebookClassName={`${btnStyles} ${styles.signupForm__social__facebook}`}
                />

                <Divider className="my-4 py-2">OR</Divider>

                <Item name="username">
                    <FloatTextInput label="Username" placeholder="Username" required>
                        <Input size="large" />
                    </FloatTextInput>
                </Item>

                <Item name="email">
                    <FloatTextInput label="Email" placeholder="Email Address" required>
                        <Input size="large" />
                    </FloatTextInput>
                </Item>

                <Item name="password">
                    <FloatTextInput label="Password" placeholder="Password" required>
                        <Password size="large" visibilityToggle={false} />
                    </FloatTextInput>
                </Item>

                <UserAgreement />

                <Button block size="large" type="primary" className={`mt-2 ${btnStyles}`}>
                    Sign Up
                </Button>

                <div className="mt-4">
                    <Button block type="text" className={`mb-1 ${styles.signupForm__footer__btn}`} onClick={openLogin}>
                        Got an account? Login
                    </Button>
                </div>
            </Form>
        </AuthModal>
    );
};

export default SignUpModal;
