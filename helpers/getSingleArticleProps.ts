import { GetServerSidePropsContext } from 'next';
import { IUnknownObject } from '@interfaces/app';
import api from 'services/axios';

export const getSingleArticleProps = async (context: GetServerSidePropsContext): Promise<IUnknownObject> => {
    const article = { slug: context?.query.slug };
    try {
        const { data } = await api.get(`/articles/${article?.slug}`);
        return {
            props: { data },
        };
    } catch (error) {
        return {
            props: { error } as unknown as never,
        };
    }
};

export default getSingleArticleProps;
