import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import truncate from 'lodash/truncate';
import { useTranslation } from 'react-i18next';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Typography from 'antd/lib/typography';

import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { ISearchResult } from '@interfaces/api';
import searchContentAction from '@redux/search/all';
import SearchResultTabs from '@components/search/SearchResultTabs';

import styles from './index.module.scss';

const { Title } = Typography;

const SearchResultContainer: FC = () => {
    const { query } = useRouter();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { data, loading, error } = useSelector(({ search: { all } }: IRootState) => all);

    useEffect(() => {
        if (query?.search) dispatch(searchContentAction({ q: query?.search as string }));
    }, [dispatch, query?.search]);

    return (
        <Row className={styles.searchResults} justify="center">
            <Col xs={24} sm={24} md={16} lg={12}>
                <Title level={2} data-title>
                    {t('searchResultTitle')} <br />
                    <span data-result>« {truncate(query?.search as string, { length: 24 })} »</span>
                </Title>

                <SearchResultTabs
                    loading={loading}
                    data={data as ISearchResult}
                    isArticle={query?.article === 'true'}
                />
            </Col>
        </Row>
    );
};

export default SearchResultContainer;
