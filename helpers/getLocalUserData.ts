import { AES, enc } from 'crypto-js';
import { CRYPTO_PASSPHASE, USER_DATA } from '@constants/platform';
import { ICurrentUser } from '@interfaces/user';
import { IUnknownObject } from '@interfaces/app';
import { isServer } from '@constants/app';

export const setLocalUserData = (data: ICurrentUser): void => {
    const user = JSON.stringify(data);
    const encrypted = `${AES.encrypt(user, CRYPTO_PASSPHASE as string)}`;
    !isServer && localStorage.setItem(USER_DATA, encrypted);
};

const getLocalUserData = (): IUnknownObject | undefined => {
    const user = !isServer ? localStorage.getItem(USER_DATA) : '';
    if (user) {
        const decryptedBytes = AES.decrypt(user, CRYPTO_PASSPHASE as string);
        const plainText = decryptedBytes.toString(enc.Utf8);
        return JSON.parse(plainText);
    }
};

export default getLocalUserData;
