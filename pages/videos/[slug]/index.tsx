import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';
import { IVideo } from '@interfaces/api';
import ServerPropsType from '@interfaces/serverProps';
import SingleVideoContainer from '@containers/SingleVideo';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));

const SingleVideoPage: NextPage<ServerPropsType> = ({ error, data }) => {
    const { t } = useTranslation();
    const { reload } = useRouter();

    const videoThumbnail = getYoutubeVideoThumbnail((data as IVideo)?.link) as string;

    return (
        <Layout
            image={videoThumbnail}
            showFooter={isEmpty(error)}
            description={(data as IVideo)?.link}
            title={(data as IVideo)?.title || t('videos')}
        >
            {!isEmpty(error) ? (
                <DynamicServerError error={error} onRefresh={() => reload()} />
            ) : (
                <SingleVideoContainer video={data as IVideo} />
            )}
        </Layout>
    );
};

export default SingleVideoPage;

export { default as getServerSideProps } from 'helpers/getSingleVideoProps';
