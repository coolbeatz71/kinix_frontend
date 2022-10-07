import React from 'react';
import { NextPage } from 'next';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';
import { IVideo } from '@interfaces/api';
import SingleVideoContainer from '@containers/SingleVideo';
import ServerPropsType from '@interfaces/serverProps';
import ServerError from '@components/common/ServerError';

const SingleVideoPage: NextPage<ServerPropsType> = (props) => {
    const { t } = useTranslation();
    const { data, error } = props;
    const { reload } = useRouter();
    return (
        <Layout showFooter={isEmpty(error)} title={(data as IVideo)?.title || t('videos')}>
            {!isEmpty(error) ? (
                <ServerError onRefresh={() => reload()} />
            ) : (
                <SingleVideoContainer video={data as IVideo} />
            )}
        </Layout>
    );
};

export default SingleVideoPage;

export { default as getServerSideProps } from 'helpers/getSingleVideoProps';
