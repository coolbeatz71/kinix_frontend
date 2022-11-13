import { Fragment } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';
import { IArticle } from '@interfaces/api';
import ServerPropsType from '@interfaces/serverProps';
import SingleArticleContainer from '@containers/SingleArticle';

const DynamicStoryModal = dynamic(() => import('@components/modal/StoryModal'));
const DynamicServerError = dynamic(() => import('@components/common/ServerError'));

const SingleArticlePage: NextPage<ServerPropsType> = ({ error, data: article }) => {
    const { t } = useTranslation();
    const { reload } = useRouter();

    return (
        <Layout
            isArticle
            showFooter={isEmpty(error)}
            image={(article as IArticle)?.images?.[0]}
            description={(article as IArticle)?.summary}
            title={(article as IArticle)?.title || t('articles')}
        >
            {!isEmpty(error) ? (
                <DynamicServerError error={error} onRefresh={() => reload()} />
            ) : (
                <Fragment>
                    <DynamicStoryModal />
                    <SingleArticleContainer article={article as IArticle} />
                </Fragment>
            )}
        </Layout>
    );
};

export default SingleArticlePage;

export { default as getServerSideProps } from 'helpers/getSingleArticleProps';
