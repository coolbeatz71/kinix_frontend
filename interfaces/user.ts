import EnumRole from './role';
import EnumProvider from './provider';

export interface ICurrentUser {
    role: string;
    email: string;
    image: string;
    userName: string;
    provider: string;
    verified: boolean;
    phoneNumber: string;
    isLoggedIn: boolean;
    allowEmailNotification: boolean;
}

export interface IUserData {
    id?: number;
    userName: string;
    email?: string | null;
    password?: string;
    phoneNumber?: string | null;
    provider?: EnumProvider;
    isLoggedIn?: boolean;
    verified?: boolean;
    active?: boolean;
    image?: string | null;
    allowEmailNotification?: boolean;
    role?: EnumRole;
    countryName?: string;
    countryFlag?: string;
    phoneISOCode?: string;
    phoneDialCode?: string;
    phonePartial?: string;
    createdAt?: string;
    updatedAt?: string;
}
