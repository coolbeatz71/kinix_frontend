import React, { FC, Fragment } from 'react';
import { Button } from 'antd';

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
    const isLogin = context === EnumAuthContext.LOGIN;
    const contextType = isLogin ? 'In' : 'Up';

    return (
        <Fragment>
            <Button block type="text" size="large" icon={<GoogleOutlined />} className={googleClassName}>
                Sign {contextType} with Google
            </Button>

            <Button block type="text" size="large" icon={<FacebookFilled />} className={facebookClassName}>
                Sign {contextType} with Facebook
            </Button>
        </Fragment>
    );
};

export default SocialLogin;
