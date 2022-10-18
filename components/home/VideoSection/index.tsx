import React, { FC, Fragment, ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { IVideo } from '@interfaces/api';
import useDarkLight from '@hooks/useDarkLight';

const DynamicExclusiveSection = dynamic(() => import('../ExclusiveSection'));
const DynamicVideoList = dynamic(() => import('@components/lists/VideoList'));
const DynamicSectionTitle = dynamic(() => import('@components/common/SectionTitle'));
const DynamicVideoListSkeleton = dynamic(() => import('@components/skeleton/VideoList'));
const DynamicSectionTitleSkeleton = dynamic(() => import('@components/skeleton/SectionTitle'));

import styles from './index.module.scss';

interface IHomeVideoSectionProps {
    title: string;
    loading: boolean;
    videos: IVideo[];
    icon: ReactElement;
    myVideos?: boolean;
    linkHasMore: string;
    isExclusive?: boolean;
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
            {loading ? (
                <DynamicSectionTitleSkeleton />
            ) : (
                <DynamicSectionTitle title={title} icon={icon} linkHasMore={linkHasMore} />
            )}

            {loading ? (
                <DynamicVideoListSkeleton />
            ) : (
                <Fragment>
                    {isExclusive && sessionDetails ? (
                        <div className="mb-5">
                            <DynamicExclusiveSection
                                tag="exclusive"
                                videos={videoList}
                                desc={sessionDetails.desc}
                                link={sessionDetails.link}
                                title={sessionDetails.title}
                                imgSrc={sessionDetails.imgSrc}
                            />
                        </div>
                    ) : (
                        <DynamicVideoList videos={videoList} myVideos={myVideos} isExclusive={isExclusive} />
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default HomeVideoSection;
