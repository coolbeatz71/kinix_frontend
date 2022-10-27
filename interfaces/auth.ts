import EnumProvider from './provider';

export interface ILoginData {
    credential: string;
    password: string;
}

export interface ISignUpData {
    email: string;
    userName: string;
    password: string;
}

export interface ISocialLoginData {
    email: string;
    userName: string;
    avatar?: string | null;
    provider: EnumProvider;
}
