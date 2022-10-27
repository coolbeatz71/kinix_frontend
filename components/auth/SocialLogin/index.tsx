import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, message, Skeleton } from 'antd';
import { IResolveParams } from 'reactjs-social-login';
import { GoogleOutlined, FacebookFilled } from 'icons';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import EnumProvider from '@interfaces/provider';
import { IUnknownObject } from '@interfaces/app';
import getNotification from '@helpers/getNotification';
import socialLoginAction from '@redux/auth/socialLogin';
import { EnumAuthContext } from '@constants/auth-context';
import { FACEBOOK_AUTH_CLIENT_ID, GOOGLE_AUTH_CLIENT_ID } from '@constants/platform';

import styles from './index.module.scss';

const DynamicGoogleLoginButton = dynamic(() => import('@components/common/GoogleLoginButton'), {
    ssr: false,
    loading: () => <Skeleton.Button active block />,
});
const DynamicFacebookLoginButton = dynamic(() => import('@components/common/FacebookLoginButton'), {
    ssr: false,
    loading: () => <Skeleton.Button active block />,
});

interface ISocialLoginProps {
    onCloseModal: () => void;
    context?: EnumAuthContext;
}

const SocialLogin: FC<ISocialLoginProps> = ({ context = EnumAuthContext.LOGIN, onCloseModal }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLogin = context === EnumAuthContext.LOGIN;
    const [localProvider, setLoginProvider] = useState<EnumProvider>();

    const { loading } = useSelector(({ auth: { socialLogin } }: IRootState) => socialLogin);

    const onSocialLogin = (provider: EnumProvider, data: IUnknownObject | undefined): void => {
        setLoginProvider(provider);
        const params =
            provider === EnumProvider.GOOGLE
                ? {
                      email: data?.email,
                      avatar: data?.picture,
                      userName: data?.given_name,
                      provider: EnumProvider.GOOGLE,
                  }
                : {
                      email: data?.email,
                      userName: data?.first_name,
                      avatar: data?.picture?.data?.url,
                      provider: EnumProvider.FACEBOOK,
                  };
        dispatch(socialLoginAction({ data: params, dispatch })).then((res) => {
            if (res.type === 'auth/socialLogin/fulfilled') onCloseModal();
            if (res.type === 'auth/socialLogin/rejected') getNotification('error', getPayload(res).message);
        });
    };

    return (
        <div className={styles.social}>
            <DynamicGoogleLoginButton
                scope="openid profile email"
                discoveryDocs="claims_supported"
                clientId={GOOGLE_AUTH_CLIENT_ID}
                onReject={() => message.error(t('serverErrorTitle'))}
                onResolve={({ data }: IResolveParams) => onSocialLogin(EnumProvider.GOOGLE, data)}
            >
                <Button
                    block
                    type="text"
                    size="middle"
                    icon={<GoogleOutlined />}
                    className={styles.social__google}
                    loading={loading && localProvider === EnumProvider.GOOGLE}
                >
                    {isLogin ? t('socialSignIn', { platform: 'Google' }) : t('socialSignUp', { platform: 'Google' })}
                </Button>
            </DynamicGoogleLoginButton>

            <DynamicFacebookLoginButton
                access_type="offline"
                appId={FACEBOOK_AUTH_CLIENT_ID}
                onReject={() => message.error(t('serverErrorTitle'))}
                fieldsProfile={'first_name,last_name,name,email,picture.width(250)'}
                onResolve={({ data }: IResolveParams) => onSocialLogin(EnumProvider.FACEBOOK, data)}
            >
                <Button
                    block
                    type="text"
                    size="middle"
                    icon={<FacebookFilled />}
                    className={styles.social__facebook}
                    loading={loading && localProvider === EnumProvider.FACEBOOK}
                >
                    {isLogin
                        ? t('socialSignIn', { platform: 'Facebook' })
                        : t('socialSignUp', { platform: 'Facebook' })}
                </Button>
            </DynamicFacebookLoginButton>
        </div>
    );
};

export default SocialLogin;
