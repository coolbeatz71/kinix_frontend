import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '@components/layout';
import SingleVideoContainer from '@containers/SingleVideo';
import { useAppDispatch } from '@redux/store';
import getSingleVideoAction from '@redux/videos/single';
import { IUnknownObject } from '@interfaces/app';

const SingleVideoPage: NextPage = () => {
    const { query } = useRouter();
    const dispatch = useAppDispatch();
    const { slug } = query as IUnknownObject;

    useEffect(() => {
        getSingleVideoAction({ slug });
    }, [dispatch, slug]);

    return (
        <Layout title="Black Shark V2 Pro Review After 6 Months">
            <SingleVideoContainer />
        </Layout>
    );
};

export default SingleVideoPage;
