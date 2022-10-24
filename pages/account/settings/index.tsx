import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';
import FavoriteContainer from '@containers/Favorite';

const SettingsPage: NextPage = () => {
    const { t } = useTranslation();
    return (
        <Layout title={t('settings')} showFooter>
            <FavoriteContainer />
        </Layout>
    );
};

export default SettingsPage;

export { default as getServerSideProps } from '@helpers/authentication';
