import React, { FC, Fragment } from 'react';
import { IVideo } from '@interfaces/api';
import SearchResultCard from '../SearchResultCard';

export interface IVideosResultProps {
    videos: IVideo[];
}

const VideosResult: FC<IVideosResultProps> = ({ videos }) => {
    return (
        <Fragment>
            {videos.map((video) => (
                <SearchResultCard key={video.slug} data={video} />
            ))}
        </Fragment>
    );
};

export default VideosResult;
