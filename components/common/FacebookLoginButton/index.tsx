import { LoginSocialFacebook } from 'reactjs-social-login';
import { IUnknownObject } from '@interfaces/app';

const FacebookLoginButton = (props: IUnknownObject): JSX.Element => {
    const { children, appId, onReject, onResolve, ...rest } = props;

    return (
        <LoginSocialFacebook appId={appId} onReject={onReject} onResolve={onResolve} {...rest}>
            {children}
        </LoginSocialFacebook>
    );
};

export default FacebookLoginButton;
