import axios from 'axios';
import nookies from 'nookies';
import qs from 'query-string';
import { destroyAuthCookies } from './cookies';
import { GetServerSidePropsContext } from 'next';
import { getLanguage } from './getLanguage';
import { IUnknownObject } from '@interfaces/app';
import { API_URL, PLATFORM_NAME } from '@constants/platform';

const redirect = (props: unknown | never): IUnknownObject => {
    destroyAuthCookies('kiinoxToken');
    return {
        redirect: {
            permanent: false,
            destination: '/',
        },
        props,
    };
};

export default async (ctx: GetServerSidePropsContext): Promise<IUnknownObject> => {
    const cookies = nookies.get(ctx);
    const { kiinoxToken } = cookies;

    if (kiinoxToken) {
        try {
            const { data } = await axios.get('/auth/user', {
                baseURL: API_URL,
                headers: {
                    platform: PLATFORM_NAME,
                    'Accept-Language': getLanguage(),
                    Authorization: `Bearer ${kiinoxToken}`,
                },
                paramsSerializer: (params) => qs.stringify(params, { encode: false }),
            });
            return {
                props: data,
            };
        } catch (error) {
            return redirect({} as unknown as never);
        }
    } else {
        return redirect({} as unknown as never);
    }
};
