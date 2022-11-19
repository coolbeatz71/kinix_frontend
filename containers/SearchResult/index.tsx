import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Row from 'antd/lib/row';

import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import searchContentAction from '@redux/search/all';

import styles from './index.module.scss';

const SearchResultContainer: FC = () => {
    const { query } = useRouter();
    const dispatch = useAppDispatch();

    const { data, loading, error } = useSelector(({ search: { all } }: IRootState) => all);

    useEffect(() => {
        if (query?.search) dispatch(searchContentAction({ q: query?.search as string }));
    }, [dispatch, query?.search]);

    return <Row className={styles.searchResults}></Row>;
};

export default SearchResultContainer;
