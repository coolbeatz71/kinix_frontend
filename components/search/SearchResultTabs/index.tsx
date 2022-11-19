import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import toLower from 'lodash/toLower';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import Tabs from 'antd/lib/tabs';
import TabPane from 'antd/lib/tabs/TabPane';

import useDarkLight from '@hooks/useDarkLight';
import { ISearchResult } from '@interfaces/api';
import searchResultTabs from '@constants/search-result-tabs';
import EnumSearchResultTabTitle from '@interfaces/searchResultTabs';

import styles from './index.module.scss';

const DynamicAllResult = dynamic(() => import('./../AllResult'));
const DynamicVideosResult = dynamic(() => import('./../VideosResult'));
const DynamicArticlesResult = dynamic(() => import('./../ArticlesResult'));

export interface ISearchResultTabsProps {
    isArticle?: boolean;
    data: ISearchResult;
}

const SearchResultTabs: FC<ISearchResultTabsProps> = ({ isArticle = false, data }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const activeSection = searchResultTabs[isArticle ? 1 : 0].title?.toLowerCase();

    const getTabsContent = (title: string): JSX.Element => {
        const videos = !isEmpty(data) ? data.videos?.videos : [];
        const articles = !isEmpty(data) ? data.articles?.articles : [];

        switch (title) {
            case EnumSearchResultTabTitle.VIDEOS:
                return <DynamicVideosResult videos={data?.videos?.videos} />;
            case EnumSearchResultTabTitle.ARTICLES:
                return <DynamicArticlesResult articles={data?.articles?.articles} />;
            default:
                return <DynamicAllResult data={[...articles, ...videos]} />;
        }
    };

    const getResultCount = (title: string): number => {
        switch (title) {
            case EnumSearchResultTabTitle.ARTICLES:
                return data?.articles?.count;
            case EnumSearchResultTabTitle.VIDEOS:
                return data?.videos?.count;
            default:
                return data?.videos?.count + data?.articles?.count;
        }
    };

    return (
        <Tabs type="card" data-theme={value} defaultActiveKey={activeSection} className={styles.searchResultTabs}>
            {searchResultTabs.map((tab) => (
                <TabPane
                    key={toLower(tab.title)}
                    tab={
                        <div className="d-flex justify-content-between align-items-center">
                            {tab.icon} {t(tab.title)} ({getResultCount(tab.title)})
                        </div>
                    }
                >
                    {getTabsContent(tab.title)}
                </TabPane>
            ))}
        </Tabs>
    );
};

export default SearchResultTabs;
