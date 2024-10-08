import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';
import FavoriteContainer from '@containers/Favorite';

const FavoritePage: NextPage = () => {
    const { t } = useTranslation();
    return (
        <Layout title={t('favoriteSection')} showFooter>
            <FavoriteContainer />
        </Layout>
    );
};

export default FavoritePage;

export { default as getServerSideProps } from '@helpers/authentication';
