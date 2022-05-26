import { API_TOKEN } from '@constants/platform';

const getToken = (): string | null => {
    if (process.browser) return localStorage.getItem(API_TOKEN) || '';
    return null;
};

export const isLoggedIn = !!getToken();
export default getToken;
