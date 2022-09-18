import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/layout';
import SingleVideoContainer from '@containers/SingleVideo';

const SingleVideoPage: NextPage = () => {
    return (
        <Layout title="Black Shark V2 Pro Review After 6 Months">
            <SingleVideoContainer />
        </Layout>
    );
};

export default SingleVideoPage;
