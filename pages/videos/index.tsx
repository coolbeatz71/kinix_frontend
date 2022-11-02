import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/layout';
import VideoContainer from '@containers/Videos';
import { useTranslation } from 'react-i18next';

const VideosPage: NextPage = () => {
    const { t } = useTranslation();
    return (
        <Layout title={t('videos')} showFooter={false} isVideoCategory>
            <VideoContainer />
        </Layout>
    );
};

export default VideosPage;
