import React, { FC } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import AuthModal from '@components/common/Modals/AuthModal';
import FloatTextInput from '@components/common/TextInput';
import SocialLogin from '../SocialLogin';

import { EnumAuthContext } from '@constants/auth-context';
import { IRootState } from 'redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { showAuthDialogAction } from 'redux/auth/showDialog';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import UserAgreement from '@components/common/UserAgreement';

const { Item } = Form;
const { Password } = Input;

const btnStyles = 'd-flex align-items-center justify-content-center';

const SignUpModal: FC = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { isOpen, context } = useSelector(({ auth: { dialog } }: IRootState) => dialog);

    const openSignUp = isOpen && context === EnumAuthContext.SIGNUP;
    const onCloseSignUp = (): void => {
        showAuthDialogAction({
            isOpen: false,
            context: EnumAuthContext.SIGNUP,
        })(dispatch);
    };

    const onOpenLogin = (): void => {
        showAuthDialogAction({
            isOpen: true,
            context: EnumAuthContext.LOGIN,
        })(dispatch);
    };

    const createAccount = t('createAccount');
    const email = t('email');
    const userName = t('userName');
    const password = t('password');
    const signUp = t('signUp');
    const alreadyHaveAccount = t('alreadyHaveAccount');

    return (
        <AuthModal title={createAccount} open={openSignUp} onCloseClick={onCloseSignUp}>
            <Form size="large" name="user_signup" className={styles.signupFormForm} layout="vertical">
                <SocialLogin
                    context={EnumAuthContext.SIGNUP}
                    googleClassName={`mb-2 ${btnStyles} ${styles.signupForm__social__google}`}
                    facebookClassName={`${btnStyles} ${styles.signupForm__social__facebook}`}
                />

                <Divider className="my-4 py-2">{t('or')}</Divider>

                <Item name="username">
                    <FloatTextInput label={userName} placeholder={userName} required>
                        <Input size="large" />
                    </FloatTextInput>
                </Item>

                <Item name="email">
                    <FloatTextInput label={email} placeholder={email} required>
                        <Input size="large" />
                    </FloatTextInput>
                </Item>

                <Item name="password">
                    <FloatTextInput label={password} placeholder={password} required>
                        <Password size="large" visibilityToggle={false} />
                    </FloatTextInput>
                </Item>

                <UserAgreement styles={styles} />

                <Button block size="large" type="primary" className={`mt-2 ${btnStyles}`}>
                    {signUp}
                </Button>

                <div className="mt-4">
                    <Button
                        block
                        type="text"
                        className={`mb-1 ${styles.signupForm__footer__btn}`}
                        onClick={onOpenLogin}
                    >
                        {alreadyHaveAccount}
                    </Button>
                </div>
            </Form>
        </AuthModal>
    );
};

export default SignUpModal;
