import React, { FC, Fragment, ReactElement } from 'react';
import SectionTitle from '@components/common/SectionTitle';
import { IUnknownObject } from '@type/app';
import VideoList from '@components/common/VideoList';

interface IHomeSectionProps {
    title: string;
    icon: ReactElement;
    fetched: boolean;
    error: string | null;
    data: IUnknownObject[];
    myVideos?: boolean;
    linkHasMore: string;
}

const HomeSection: FC<IHomeSectionProps> = ({ title, icon, linkHasMore, fetched, error, data, myVideos }) => {
    return (
        <Fragment>
            <SectionTitle title={title} icon={icon} linkHasMore={linkHasMore} />;
            <VideoList fetched={fetched} error={error} data={data} myVideos={myVideos} />
        </Fragment>
    );
};

export default HomeSection;
