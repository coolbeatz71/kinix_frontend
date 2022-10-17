import React, { FC, useEffect, useState } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SocialLogin from '../SocialLogin';
import { IRootState } from 'redux/reducers';
import { useAppDispatch } from 'redux/store';
import { ISignUpData } from '@interfaces/auth';
import AuthModal from '@components/modal/AuthModal';
import FloatTextInput from '@components/common/TextInput';
import { EnumAuthContext } from '@constants/auth-context';
import UserAgreement from '@components/common/UserAgreement';
import { showAuthDialogAction } from 'redux/auth/showDialog';
import signUpAction, { resetSignUpAction } from 'redux/auth/signup';
import AccountConfirmation from '@components/auth/AccountConfirmation';
import { emailValidator, passwordMatchValidator, passwordValidator, userNameValidator } from './validator';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));

import styles from './index.module.scss';

const { Item } = Form;
const { Password } = Input;

const btnStyles = 'd-flex align-items-center justify-content-center';

const SignUpModal: FC = () => {
    const { t } = useTranslation();
    const [canVerify, setCanVerify] = useState(false);

    const dispatch = useAppDispatch();
    const { isOpen, context } = useSelector(({ auth: { dialog } }: IRootState) => dialog);
    const { error, loading, data } = useSelector(({ auth: { signup } }: IRootState) => signup);

    useEffect(() => {
        if (isOpen) resetSignUpAction()(dispatch);
    }, [dispatch, isOpen]);

    const onSubmit = (formValues: ISignUpData): void => {
        const { userName, email, password } = formValues;
        dispatch(signUpAction({ userName, email, password })).then((res) => {
            if (res.type === 'auth/signup/fulfilled') setCanVerify(true);
        });
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
            {canVerify ? (
                <AccountConfirmation credential={data.email} onCloseModal={onCloseSignUp} />
            ) : (
                <Form
                    size="large"
                    layout="vertical"
                    name="user_signup"
                    onFinish={onSubmit}
                    className={styles.signupForm}
                >
                    <SocialLogin
                        context={EnumAuthContext.SIGNUP}
                        googleClassName={`mb-2 ${btnStyles} ${styles.signupForm__social__google}`}
                        facebookClassName={`${btnStyles} ${styles.signupForm__social__facebook}`}
                    />

                    <Divider className="my-2 py-2">{t('or')}</Divider>

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

                    <DynamicErrorAlert error={error} showIcon closable banner />

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
            )}
        </AuthModal>
    );
};

export default SignUpModal;
