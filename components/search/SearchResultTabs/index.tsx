import { FC } from 'react';
import toLower from 'lodash/toLower';
import { useTranslation } from 'react-i18next';

import Tabs from 'antd/lib/tabs';
import TabPane from 'antd/lib/tabs/TabPane';

import useDarkLight from '@hooks/useDarkLight';
import { ISearchResult } from '@interfaces/api';
import AllResult from '@components/search/AllResult';
import VideosResult from '@components/search/VideosResult';
import searchResultTabs from '@constants/search-result-tabs';
import ArticlesResult from '@components/search/ArticlesResult';
import EnumSearchResultTabTitle from '@interfaces/searchResultTabs';

import styles from './index.module.scss';

export interface ISearchResultTabsProps {
    isArticle?: boolean;
    data: ISearchResult;
}

const SearchResultTabs: FC<ISearchResultTabsProps> = ({ isArticle = false, data }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const activeSection = searchResultTabs[isArticle ? 1 : 0].title?.toLowerCase();

    const getTabsContent = (title: string): JSX.Element => {
        switch (title) {
            case EnumSearchResultTabTitle.VIDEOS:
                return <VideosResult videos={data?.videos?.videos} />;
            case EnumSearchResultTabTitle.ARTICLES:
                return <ArticlesResult articles={data?.articles?.articles} />;
            default:
                return <AllResult data={data} />;
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
