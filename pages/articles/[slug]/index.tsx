import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/layout';
import SingleArticleContainer from '@containers/SingleArticle';

const SingleArticlePage: NextPage = () => {
    return (
        <Layout title="Artificial Intelligence in our homes For the next years">
            <SingleArticleContainer />
        </Layout>
    );
};

export default SingleArticlePage;
