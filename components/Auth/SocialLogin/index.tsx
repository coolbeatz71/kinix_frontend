import React, { FC, Fragment } from 'react';
import { Button } from 'antd';

import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';

interface ISocialLoginProps {
    googleClassName: string;
    facebookClassName: string;
}

const SocialLogin: FC<ISocialLoginProps> = ({ googleClassName, facebookClassName }) => {
    return (
        <Fragment>
            <Button block type="text" size="large" icon={<GoogleOutlined />} className={googleClassName}>
                Sign In with Google
            </Button>

            <Button block type="text" size="large" icon={<FacebookFilled />} className={facebookClassName}>
                Sign In with Facebook
            </Button>
        </Fragment>
    );
};

export default SocialLogin;
