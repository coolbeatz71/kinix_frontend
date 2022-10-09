import React from 'react';
import { NextPage } from 'next';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';
import { IArticle } from '@interfaces/api';
import ServerPropsType from '@interfaces/serverProps';
import ServerError from '@components/common/ServerError';
import SingleArticleContainer from '@containers/SingleArticle';

const SingleArticlePage: NextPage<ServerPropsType> = ({ error, data }) => {
    const { t } = useTranslation();
    const { reload } = useRouter();

    return (
        <Layout
            showFooter={isEmpty(error)}
            image={(data as IArticle)?.images?.[0]}
            description={(data as IArticle)?.summary}
            title={(data as IArticle)?.title || t('articles')}
        >
            {!isEmpty(error) ? (
                <ServerError onRefresh={() => reload()} />
            ) : (
                <SingleArticleContainer article={data as IArticle} />
            )}
        </Layout>
    );
};

export default SingleArticlePage;

export { default as getServerSideProps } from 'helpers/getSingleArticleProps';
