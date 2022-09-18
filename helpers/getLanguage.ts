export const getLanguage = (): string => {
    if (process.browser) {
        const language = localStorage.getItem('USER_LANG') || 'fr';
        return language;
    }

    return 'fr';
};
