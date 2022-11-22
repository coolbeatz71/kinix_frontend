import dynamic from 'next/dynamic';
import React, { FC, Fragment } from 'react';

const DynamicSectionTitleSkeleton = dynamic(() => import('@components/skeleton/SectionTitle'));
const DynamicPlaylistsListSkeleton = dynamic(() => import('@components/skeleton/PlaylistsList'));

const SearchResultList: FC = () => {
    return (
        <Fragment>
            <DynamicSectionTitleSkeleton />
            <DynamicPlaylistsListSkeleton isSearchResult />
        </Fragment>
    );
};

export default SearchResultList;
