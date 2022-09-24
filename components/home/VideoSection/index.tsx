import React, { FC, Fragment, ReactElement } from 'react';
import SectionTitle from '@components/common/SectionTitle';
import VideoList from '@components/common/VideoList';
import useDarkLight from '@hooks/useDarkLight';
import { IVideo } from '@interfaces/api';
import ExclusiveSection from '../ExclusiveSection';
import VideoListSkeleton from '@components/skeleton/VideoList';
import SectionTitleSkeleton from '@components/skeleton/SectionTitle';

import styles from './index.module.scss';

interface IHomeVideoSectionProps {
    title: string;
    loading: boolean;
    icon: ReactElement;
    myVideos?: boolean;
    linkHasMore: string;
    isExclusive?: boolean;
    videos: IVideo[];
    sessionDetails?: {
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
    loading,
    myVideos,
    sessionDetails,
    linkHasMore,
    isExclusive = false,
}) => {
    const { value } = useDarkLight();

    const videoList = isExclusive ? videos?.slice(0, 8) : videos?.slice(0, 12);

    return (
        <div data-theme={value} className={styles.homeVideoSection}>
            {loading ? <SectionTitleSkeleton /> : <SectionTitle title={title} icon={icon} linkHasMore={linkHasMore} />}

            {loading ? (
                <VideoListSkeleton />
            ) : (
                <Fragment>
                    {isExclusive && sessionDetails ? (
                        <div className="mb-5">
                            <ExclusiveSection
                                tag="exclusive"
                                videos={videoList}
                                desc={sessionDetails.desc}
                                link={sessionDetails.link}
                                title={sessionDetails.title}
                                imgSrc={sessionDetails.imgSrc}
                            />
                        </div>
                    ) : (
                        <VideoList videos={videoList} myVideos={myVideos} isExclusive={isExclusive} />
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default HomeVideoSection;
