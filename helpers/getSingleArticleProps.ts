import { NextPageContext } from 'next';
import api from 'services/axios';

export const getSingleArticleProps = async (context: NextPageContext): Promise<never> => {
    let error = null;
    let article = { slug: context?.query.slug };
    try {
        const _article = await api.get(`/articles/${article?.slug}`);
        article = _article.data;
    } catch (_error) {
        error = _error;
    }

    return { error, article } as never;
};

export default getSingleArticleProps;
