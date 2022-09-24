import React, { FC, ReactElement } from 'react';
import SectionTitle from '@components/common/SectionTitle';
import VideoList from '@components/common/VideoList';
import useDarkLight from '@hooks/useDarkLight';
import ExclusiveSection from '../ExclusiveSection';
import { IVideo } from '@interfaces/videos';

import styles from './index.module.scss';

interface IHomeVideoSectionProps {
    title: string;
    fetched: boolean;
    icon: ReactElement;
    myVideos?: boolean;
    linkHasMore: string;
    hasExclusive?: boolean;
    videos: IVideo[];
    exclusive?: {
        link: string;
        desc: string;
        title: string;
        imgSrc: string;
    };
}

const HomeVideoSection: FC<IHomeVideoSectionProps> = ({
    icon,
    title,
    videos,
    fetched,
    myVideos,
    exclusive,
    linkHasMore,
    hasExclusive = false,
}) => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.homeVideoSection}>
            <SectionTitle title={title} icon={icon} linkHasMore={linkHasMore} />

            {hasExclusive && exclusive && (
                <div className="mb-5">
                    <ExclusiveSection
                        tag="exclusive"
                        videos={videos}
                        desc={exclusive.desc}
                        link={exclusive.link}
                        title={exclusive.title}
                        imgSrc={exclusive.imgSrc}
                    />
                </div>
            )}

            <VideoList fetched={fetched} videos={videos} myVideos={myVideos} hasExclusive={hasExclusive} />
        </div>
    );
};

export default HomeVideoSection;
