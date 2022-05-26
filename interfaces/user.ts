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
