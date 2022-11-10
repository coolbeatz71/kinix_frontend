import { Fragment } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import Layout from '@components/layout';
import HomeContainer from '@containers/Home';

const DynamicStoryModal = dynamic(() => import('@components/modal/StoryModal'));

const Home: NextPage = () => {
    const { t } = useTranslation();

    return (
        <Layout title={t('home')}>
            <Fragment>
                <HomeContainer />
                <DynamicStoryModal />
            </Fragment>
        </Layout>
    );
};

export default Home;
