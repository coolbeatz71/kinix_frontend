import React, { FC } from 'react';
import { Tabs } from 'antd';
import toLower from 'lodash/toLower';
import videosTabs, { ETabTitle } from '@constants/videos-tabs';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import Lyrics from '@components/common/Lyrics';
import PopularVideoList from '@components/lists/PopularVideoList';

import styles from './index.module.scss';

const { TabPane } = Tabs;

export interface IVideosTabsProps {
    lyrics: string;
}

const VideosTabs: FC<IVideosTabsProps> = ({ lyrics }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();

    const getTabsContent = (title: string): JSX.Element => {
        switch (title) {
            case ETabTitle.LYRICS:
                return <Lyrics content={lyrics} />;
            default:
                return <PopularVideoList />;
        }
    };

    return (
        <Tabs defaultActiveKey="0" className={styles.videosTabs} data-theme={value}>
            {videosTabs.map((tab) => (
                <TabPane tab={t(toLower(tab.title))} key={tab.title}>
                    {getTabsContent(tab.title)}
                </TabPane>
            ))}
        </Tabs>
    );
};

export default VideosTabs;
