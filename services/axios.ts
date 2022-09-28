import axios, { AxiosError, AxiosResponse } from 'axios';
import qs from 'query-string';
import { API_TOKEN, API_URL, PLATFORM_NAME, USER_DATA } from '@constants/platform';
import getToken from '@helpers/getToken';
import { HOME_PATH } from '@constants/paths';
import { LOGIN_REQUIRED, TOKEN_INVALID_EXPIRED } from '@constants/api';
import { isServer } from '@constants/app';
import { persistor } from '@redux/store';
import { getLanguage } from '@helpers/getLanguage';

const token = getToken();
const lang = getLanguage();

const api = axios.create({
    baseURL: API_URL,
    paramsSerializer: (params) => qs.stringify(params, { encode: false }),
    headers: {
        platform: PLATFORM_NAME,
        'Accept-Language': lang,
        Authorization: `Bearer ${token}`,
    },
});

const responseHandler = (response: AxiosResponse): AxiosResponse => response.data;
const errorHandler = async (error: AxiosError): Promise<AxiosError> => {
    let errorResponse;
    if ([LOGIN_REQUIRED, TOKEN_INVALID_EXPIRED].includes(error.response?.data.code)) {
        persistor.purge();
        !isServer && localStorage.removeItem(USER_DATA);
        !isServer && localStorage.removeItem(API_TOKEN);
        window.location.href = HOME_PATH;
    }

    if (error.response) {
        const msg = error.response.data.message;
        errorResponse = typeof msg !== 'string' ? { message: msg[0]?.msg } : error.response.data;
    } else errorResponse = error.message;

    return await Promise.reject(errorResponse);
};

api.interceptors.response.use(responseHandler, errorHandler);

export default api;
