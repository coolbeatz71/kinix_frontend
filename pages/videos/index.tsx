import React, { Fragment } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import Layout from '@components/layout';
import VideoContainer from '@containers/Videos';

const DynamicStoryModal = dynamic(() => import('@components/modal/StoryModal'));

const VideosPage: NextPage = () => {
    const { t } = useTranslation();

    return (
        <Layout title={t('videos')} showFooter={false} isVideoCategory>
            <Fragment>
                <VideoContainer />
                <DynamicStoryModal />
            </Fragment>
        </Layout>
    );
};

export default VideosPage;
