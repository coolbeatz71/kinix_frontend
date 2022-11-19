import React, { FC, Fragment } from 'react';

import { IArticle, IVideo } from '@interfaces/api';
import SearchResultCard from '../SearchResultCard';
import sortSearchResults from '@helpers/sortSearchResults';

export interface IAllResultProps {
    data: (IArticle | IVideo)[];
}

const AllResult: FC<IAllResultProps> = ({ data }) => {
    const sortedData = sortSearchResults(data);

    return (
        <Fragment>
            {sortedData.map((data) => (
                <SearchResultCard key={data.slug} data={data} />
            ))}
        </Fragment>
    );
};

export default AllResult;
