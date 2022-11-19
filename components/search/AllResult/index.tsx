import { FC, Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import { ISearchResult } from '@interfaces/api';
import EmptyData from '@components/common/EmptyData';
import sortSearchResults from '@helpers/sortSearchResults';
import SearchResultCard from '@components/cards/SearchResult';
import { EnumEmptyDataType } from '@constants/empty-data-type';

export interface IAllResultProps {
    data: ISearchResult;
}

const AllResult: FC<IAllResultProps> = ({ data }) => {
    const { t } = useTranslation();
    const videos = !isEmpty(data) ? data.videos?.videos : [];
    const articles = !isEmpty(data) ? data.articles?.articles : [];

    const sortedData = sortSearchResults([...articles, ...videos]);

    return (
        <Fragment>
            {isEmpty(data) ? (
                <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noSearchResultFound')} />
            ) : (
                sortedData?.map((data) => <SearchResultCard key={data.slug} data={data} />)
            )}
        </Fragment>
    );
};

export default AllResult;
