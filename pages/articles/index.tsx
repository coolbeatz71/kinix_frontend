import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/Layout';
import ArticleContainer from '@containers/Articles';

const ArticlesPage: NextPage = () => {
    return (
        <Layout title="Articles" showFooter={false}>
            <ArticleContainer />
        </Layout>
    );
};

export default ArticlesPage;
