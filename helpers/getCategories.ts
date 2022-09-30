import api from 'services/axios';
import { IUnknownObject } from '@interfaces/app';
import App, { AppContext } from 'next/app';

const getCategories = async (context: AppContext): Promise<IUnknownObject> => {
    let error = null;
    let categories = [];
    const ctx = await App.getInitialProps(context);

    try {
        const { data } = await api.get('/videos/categories');
        categories = data;
    } catch (err: unknown) {
        error = (err as Error).message || 'Network or an unknown error occurred!';
    }

    return { ...ctx, serverProps: { categories, error } };
};

export default getCategories;
