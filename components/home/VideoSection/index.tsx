import React, { FC, ReactElement } from 'react';
import SectionTitle from '@components/common/SectionTitle';
import { IUnknownObject } from 'interfaces/app';
import VideoList from '@components/common/VideoList';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';
import ExclusiveSection from '../ExclusiveSection';

interface IHomeVideoSectionProps {
    title: string;
    icon: ReactElement;
    fetched: boolean;
    error: string | null;
    videos: IUnknownObject[];
    myVideos?: boolean;
    linkHasMore: string;
    hasExclusive?: boolean;
    exclusive?: {
        link: string;
        desc: string;
        title: string;
        imgSrc: string;
        videos: IUnknownObject[];
    };
}

const HomeVideoSection: FC<IHomeVideoSectionProps> = ({
    title,
    icon,
    linkHasMore,
    fetched,
    error,
    videos,
    myVideos,
    hasExclusive = false,
    exclusive,
}) => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.homeVideoSection}>
            <SectionTitle title={title} icon={icon} linkHasMore={linkHasMore} />

            {hasExclusive && exclusive && (
                <div className="mb-5">
                    <ExclusiveSection
                        tag="exclusive"
                        desc={exclusive.desc}
                        link={exclusive.link}
                        title={exclusive.title}
                        imgSrc={exclusive.imgSrc}
                        videos={exclusive.videos}
                    />
                </div>
            )}

            <VideoList
                fetched={fetched}
                error={error}
                videos={videos}
                myVideos={myVideos}
                hasExclusive={hasExclusive}
            />
        </div>
    );
};

export default HomeVideoSection;
