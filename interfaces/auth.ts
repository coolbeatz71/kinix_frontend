import EnumPromotionPlan from '@constants/promotion';

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
    image?: string | null;
    provider: EnumPromotionPlan;
}
