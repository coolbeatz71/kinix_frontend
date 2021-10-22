import { DEV_URL, PROD_URL, STAGING_URL } from '@constants/platform';

const getPlatformUrl = (): string | undefined => {
    if (process.env.NODE_ENV === 'development') return DEV_URL;
    if (process.env.NODE_ENV === 'production') return PROD_URL;
    return STAGING_URL;
};

export default getPlatformUrl;
