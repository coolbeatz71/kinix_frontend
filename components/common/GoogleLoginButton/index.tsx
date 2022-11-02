import { LoginSocialGoogle } from 'reactjs-social-login';
import { IUnknownObject } from '@interfaces/app';

const GoogleLoginButton = (props: IUnknownObject): JSX.Element => {
    const { children, clientId, onReject, onResolve, ...rest } = props;

    return (
        <LoginSocialGoogle client_id={clientId} onReject={onReject} onResolve={onResolve} {...rest}>
            {children}
        </LoginSocialGoogle>
    );
};

export default GoogleLoginButton;
