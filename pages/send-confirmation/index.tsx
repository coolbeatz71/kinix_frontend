import React from 'react';
import { NextPage } from 'next';
import Layout from '@components/layout';
import { useTranslation } from 'react-i18next';
import SendConfirmationContainer from '@containers/SendConfirmation';

const SendConfirmationPage: NextPage = () => {
    const { t } = useTranslation();
    return (
        <Layout title={t('confirmationSent')} showFooter={false} showHeader={false}>
            <SendConfirmationContainer />
        </Layout>
    );
};

export default SendConfirmationPage;
