import { USER_LANG } from '@constants/platform';

export const getLanguage = (): string => {
    if (process.browser) {
        return localStorage.getItem(USER_LANG) || 'fr';
    }

    return 'fr';
};
