import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/layout';
import ArticleContainer from '@containers/Articles';
import { useTranslation } from 'react-i18next';

const ArticlesPage: NextPage = () => {
    const { t } = useTranslation();
    return (
        <Layout title={t('articles')} showFooter={false}>
            <ArticleContainer />
        </Layout>
    );
};

export default ArticlesPage;
