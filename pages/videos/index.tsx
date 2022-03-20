import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/Layout';
import VideoContainer from '@containers/Videos';

const VideosPage: NextPage = () => {
    return (
        <Layout title="Videos" showFooter={false} isVideoCategory>
            <VideoContainer />
        </Layout>
    );
};

export default VideosPage;
