import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import truncate from 'lodash/truncate';
import { useTranslation } from 'react-i18next';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Typography from 'antd/lib/typography';

import dynamic from 'next/dynamic';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { ISearchResult } from '@interfaces/api';
import searchContentAction from '@redux/search/all';

import styles from './index.module.scss';

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicSearchResultTabs = dynamic(() => import('@components/search/SearchResultTabs'));
const DynamicSearchResultList = dynamic(() => import('@components/skeleton/SearchResultList'));

const { Title } = Typography;

const SearchResultContainer: FC = () => {
    const { query } = useRouter();
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    const { data, loading, error } = useSelector(({ search: { all } }: IRootState) => all);

    useEffect(() => {
        if (query?.search) dispatch(searchContentAction({ q: query?.search as string }));
    }, [dispatch, query?.search]);

    return (
        <Row className={styles.searchResults} justify="center" data-theme={value}>
            {error ? (
                <Col xs={24}>
                    <DynamicServerError
                        error={error}
                        onRefresh={() => {
                            dispatch(searchContentAction({ q: query?.search as string }));
                        }}
                    />
                </Col>
            ) : (
                <Col xs={24} sm={24} md={22} lg={18} xl={14} className={styles.searchResults__content}>
                    <Title level={2} data-title>
                        {t('searchResultTitle')} <br />
                        <span data-result>« {truncate(query?.search as string, { length: 24 })} »</span>
                    </Title>

                    {loading ? (
                        <DynamicSearchResultList />
                    ) : (
                        <DynamicSearchResultTabs data={data as ISearchResult} isArticle={query?.article === 'true'} />
                    )}
                </Col>
            )}
        </Row>
    );
};

export default SearchResultContainer;
