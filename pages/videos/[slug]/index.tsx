import { Fragment } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';
import { IVideo } from '@interfaces/api';
import ServerPropsType from '@interfaces/serverProps';
import SingleVideoContainer from '@containers/SingleVideo';
import getSingleVideoProps from '@helpers/getSingleVideoProps';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';

const DynamicStoryModal = dynamic(() => import('@components/modal/StoryModal'));
const DynamicServerError = dynamic(() => import('@components/common/ServerError'));

const SingleVideoPage: NextPage<ServerPropsType> = ({ error, video }) => {
    const { t } = useTranslation();
    const { reload } = useRouter();

    const videoThumbnail = getYoutubeVideoThumbnail((video as IVideo)?.link) as string;

    return (
        <Layout
            isArticle
            image={videoThumbnail}
            showFooter={isEmpty(error)}
            description={(video as IVideo)?.link}
            title={(video as IVideo)?.title || t('videos')}
        >
            {!isEmpty(error) ? (
                <DynamicServerError error={error} onRefresh={() => reload()} />
            ) : (
                <Fragment>
                    <DynamicStoryModal />
                    <SingleVideoContainer video={video as IVideo} />
                </Fragment>
            )}
        </Layout>
    );
};

SingleVideoPage.getInitialProps = getSingleVideoProps;

export default SingleVideoPage;
