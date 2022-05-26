import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_TOKEN, API_URL, PLATFORM_NAME } from '@constants/platform';
import getToken from '@helpers/getToken';
import { HOME_PATH } from '@constants/paths';
import { TOKEN_INVALID_EXPIRED } from '@constants/api';

const token = getToken();

const api = axios.create({
    baseURL: API_URL,
    headers: {
        platform: PLATFORM_NAME,
        Authorization: `Bearer ${token}`,
    },
});

const responseHandler = (response: AxiosResponse): AxiosResponse => response.data;
const errorHandler = async (error: AxiosError): Promise<AxiosError> => {
    if (error?.message === TOKEN_INVALID_EXPIRED) {
        if (process.browser) {
            localStorage.removeItem(API_TOKEN);
            window.location.href = HOME_PATH;
        }
    }
    const errorResponse = error.response ? error.response.data : error.message;
    return await Promise.reject(errorResponse);
};

api.interceptors.response.use(responseHandler, errorHandler);

export default api;
