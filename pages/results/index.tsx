import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import Layout from '@components/layout';
import SearchResultContainer from '@containers/SearchResult';

const SearchResultsPage: NextPage = () => {
    const { t } = useTranslation();

    return (
        <Layout title={t('searchResults')} showFooter={false}>
            <SearchResultContainer />
        </Layout>
    );
};

export default SearchResultsPage;
