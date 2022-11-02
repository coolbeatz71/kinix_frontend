import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/layout';
import HomeContainer from '@containers/Home';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
    const { t } = useTranslation();

    return (
        <Layout title={t('home')}>
            <HomeContainer />
        </Layout>
    );
};

export default Home;
