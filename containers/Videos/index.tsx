import VideoList from '@components/common/VideoList';
import TagsBar from '@components/Layout/TagsBar';
import React, { FC } from 'react';

const VideoContainer: FC = () => {
    return (
        <div data-content-padding className="d-block">
            <TagsBar />
            <div className="mt-5">
                <VideoList fetched={true} error={null} videos={[]} myVideos={false} hasExclusive={false} />
            </div>
        </div>
    );
};

export default VideoContainer;
