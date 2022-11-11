import { NextPageContext } from 'next';
import api from 'services/axios';

export const getSingleVideoProps = async (context: NextPageContext): Promise<never> => {
    let error = null;
    let video = { slug: context?.query.slug };
    try {
        const _video = await api.get(`/videos/${video?.slug}`);
        video = _video.data;
    } catch (_error) {
        error = _error;
    }

    return { error, video } as never;
};

export default getSingleVideoProps;
