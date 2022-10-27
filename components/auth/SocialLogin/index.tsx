import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { Button, message, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { IResolveParams } from 'reactjs-social-login';
import { GoogleOutlined, FacebookFilled } from 'icons';
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
    context?: EnumAuthContext;
}

const SocialLogin: FC<ISocialLoginProps> = ({ context = EnumAuthContext.LOGIN }) => {
    const { t } = useTranslation();
    const isLogin = context === EnumAuthContext.LOGIN;

    return (
        <div className={styles.social}>
            <DynamicGoogleLoginButton
                scope="openid profile email"
                discoveryDocs="claims_supported"
                clientId={GOOGLE_AUTH_CLIENT_ID}
                onResolve={({ data }: IResolveParams) => {
                    console.log(data);
                }}
                onReject={() => {
                    message.error(t('serverErrorTitle'));
                }}
            >
                <Button block type="text" size="middle" icon={<GoogleOutlined />} className={styles.social__google}>
                    {isLogin ? t('socialSignIn', { platform: 'Google' }) : t('socialSignUp', { platform: 'Google' })}
                </Button>
            </DynamicGoogleLoginButton>

            <DynamicFacebookLoginButton
                access_type="offline"
                appId={FACEBOOK_AUTH_CLIENT_ID}
                fieldsProfile={'first_name,name,picture.width(250)'}
                onResolve={({ data }: IResolveParams) => {
                    console.log(data);
                }}
                onReject={() => {
                    message.error(t('serverErrorTitle'));
                }}
            >
                <Button block type="text" size="middle" icon={<FacebookFilled />} className={styles.social__facebook}>
                    {isLogin
                        ? t('socialSignIn', { platform: 'Facebook' })
                        : t('socialSignUp', { platform: 'Facebook' })}
                </Button>
            </DynamicFacebookLoginButton>
        </div>
    );
};

export default SocialLogin;
