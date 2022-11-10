import { Fragment } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import Layout from '@components/layout';
import ArticleContainer from '@containers/Articles';

const DynamicStoryModal = dynamic(() => import('@components/modal/StoryModal'));

const ArticlesPage: NextPage = () => {
    const { t } = useTranslation();

    return (
        <Layout title={t('articles')} showFooter={false}>
            <Fragment>
                <ArticleContainer />
                <DynamicStoryModal />
            </Fragment>
        </Layout>
    );
};

export default ArticlesPage;
