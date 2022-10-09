import { GetServerSidePropsContext } from 'next';
import { IUnknownObject } from '@interfaces/app';
import api from 'services/axios';

export const getSingleVideoProps = async (context: GetServerSidePropsContext): Promise<IUnknownObject> => {
    const video = { slug: context?.query.slug };
    try {
        const { data } = await api.get(`/videos/${video?.slug}`);
        return {
            props: { data },
        };
    } catch (error) {
        return {
            props: { error } as unknown as never,
        };
    }
};

export default getSingleVideoProps;
