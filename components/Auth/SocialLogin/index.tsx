import React, { FC, Fragment } from 'react';
import { Button } from 'antd';

import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { EAuthContext } from '@constants/auth-context';

interface ISocialLoginProps {
    context?: EAuthContext;
    googleClassName: string;
    facebookClassName: string;
}

const SocialLogin: FC<ISocialLoginProps> = ({ context = EAuthContext.LOGIN, googleClassName, facebookClassName }) => {
    const isLogin = context === EAuthContext.LOGIN;
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
