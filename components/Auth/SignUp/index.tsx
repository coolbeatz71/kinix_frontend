import React, { FC, useEffect } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import AuthModal from '@components/common/Modals/AuthModal';
import FloatTextInput from '@components/common/TextInput';
import SocialLogin from '../SocialLogin';

import { EnumAuthContext } from '@constants/auth-context';
import { useAppDispatch } from 'redux/store';
import { IRootState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { showAuthDialogAction } from 'redux/auth/showDialog';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import UserAgreement from '@components/common/UserAgreement';
import { emailValidator, passwordMatchValidator, passwordValidator, userNameValidator } from './validator';
import signUpAction, { resetSignUpAction } from 'redux/auth/signup';
import { ISignUpData } from '@interfaces/auth';
import ErrorAlert from '@components/common/ErrorAlert';

const { Item } = Form;
const { Password } = Input;

const btnStyles = 'd-flex align-items-center justify-content-center';

const SignUpModal: FC = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const { error, loading } = useSelector(({ auth: { signup } }: IRootState) => signup);
    const { isOpen, context } = useSelector(({ auth: { dialog } }: IRootState) => dialog);

    useEffect(() => {
        if (isOpen) resetSignUpAction()(dispatch);
    }, [dispatch, isOpen]);

    const onSubmit = (formValues: ISignUpData): void => {
        const { userName, email, password } = formValues;
        dispatch(signUpAction({ userName, email, password }));
    };

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

    const email = t('email');
    const signUp = t('signUp');
    const userName = t('userName');
    const password = t('password');
    const confPassword = t('confPassword');
    const createAccount = t('createAccount');
    const alreadyHaveAccount = t('alreadyHaveAccount');

    return (
        <AuthModal title={createAccount} open={openSignUp} onCloseClick={onCloseSignUp}>
            <Form
                size="large"
                name="user_signup"
                className={styles.signupFormForm}
                layout="vertical"
                onFinish={onSubmit}
            >
                <SocialLogin
                    context={EnumAuthContext.SIGNUP}
                    googleClassName={`mb-2 ${btnStyles} ${styles.signupForm__social__google}`}
                    facebookClassName={`${btnStyles} ${styles.signupForm__social__facebook}`}
                />

                <Divider className="my-4 py-2">{t('or')}</Divider>

                <Item name="userName" validateTrigger={['onSubmit', 'onBlur']} rules={userNameValidator(userName)}>
                    <FloatTextInput label={userName} placeholder={userName} required>
                        <Input size="large" />
                    </FloatTextInput>
                </Item>

                <Item name="email" validateTrigger={['onSubmit', 'onBlur']} rules={emailValidator()}>
                    <FloatTextInput label={email} placeholder={email} required>
                        <Input size="large" />
                    </FloatTextInput>
                </Item>

                <Item name="password" validateTrigger={['onSubmit', 'onBlur']} rules={passwordValidator(password)}>
                    <FloatTextInput label={password} placeholder={password} required>
                        <Password size="large" visibilityToggle />
                    </FloatTextInput>
                </Item>

                <Item
                    name="confPassword"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={passwordMatchValidator(confPassword)}
                >
                    <FloatTextInput label={confPassword} placeholder={confPassword} required>
                        <Password size="large" visibilityToggle />
                    </FloatTextInput>
                </Item>

                <ErrorAlert error={error} showIcon closable banner />

                <UserAgreement styles={styles} />

                <Button
                    block
                    size="large"
                    type="primary"
                    loading={loading}
                    htmlType="submit"
                    className={`mt-2 ${btnStyles}`}
                >
                    {signUp}
                </Button>

                <div className="mt-4">
                    <Button
                        block
                        type="text"
                        onClick={onOpenLogin}
                        className={`mb-1 ${styles.signupForm__footer__btn}`}
                    >
                        {alreadyHaveAccount}
                    </Button>
                </div>
            </Form>
        </AuthModal>
    );
};

export default SignUpModal;
