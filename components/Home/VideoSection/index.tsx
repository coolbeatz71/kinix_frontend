import React, { FC, ReactElement } from 'react';
import SectionTitle from '@components/common/SectionTitle';
import { IUnknownObject } from 'interfaces/app';
import VideoList from '@components/common/VideoList';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

interface IHomeVideoSectionProps {
    title: string;
    icon: ReactElement;
    fetched: boolean;
    error: string | null;
    videos: IUnknownObject[];
    myVideos?: boolean;
    linkHasMore: string;
}

const HomeVideoSection: FC<IHomeVideoSectionProps> = ({
    title,
    icon,
    linkHasMore,
    fetched,
    error,
    videos,
    myVideos,
}) => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.homeVideoSection}>
            <SectionTitle title={title} icon={icon} linkHasMore={linkHasMore} />
            <VideoList fetched={fetched} error={error} videos={videos} myVideos={myVideos} />
        </div>
    );
};

export default HomeVideoSection;
