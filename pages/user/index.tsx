import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';

const UsersPage: NextPage = () => {
    const { t } = useTranslation();
    return (
        <Layout title={t('account')} showFooter={false}>
            <div>lol</div>
        </Layout>
    );
};

export default UsersPage;

export { default as getServerSideProps } from '@helpers/authentication';
