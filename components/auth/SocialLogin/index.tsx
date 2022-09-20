import React, { FC, Fragment } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { EnumAuthContext } from '@constants/auth-context';

interface ISocialLoginProps {
    context?: EnumAuthContext;
    googleClassName: string;
    facebookClassName: string;
}

const SocialLogin: FC<ISocialLoginProps> = ({
    context = EnumAuthContext.LOGIN,
    googleClassName,
    facebookClassName,
}) => {
    const { t } = useTranslation();
    const isLogin = context === EnumAuthContext.LOGIN;

    return (
        <Fragment>
            <Button block type="text" size="middle" icon={<GoogleOutlined />} className={googleClassName}>
                {isLogin ? t('socialSignIn', { platform: 'Google' }) : t('socialSignUp', { platform: 'Google' })}
            </Button>

            <Button block type="text" size="middle" icon={<FacebookFilled />} className={facebookClassName}>
                {isLogin ? t('socialSignIn', { platform: 'Facebook' }) : t('socialSignUp', { platform: 'Facebook' })}
            </Button>
        </Fragment>
    );
};

export default SocialLogin;
