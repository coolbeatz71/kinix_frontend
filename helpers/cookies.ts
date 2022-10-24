import nookies from 'nookies';

const setAuthCookies = (token: string): void => {
    nookies.set(null, 'kiinoxToken', token, {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
    });
};

export const destroyAuthCookies = (name: string): void => {
    nookies.destroy(null, name, null);
};

export default setAuthCookies;
