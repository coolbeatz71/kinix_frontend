import React, { FC } from 'react';
import VideoList from '@components/common/VideoList';
import TagsBar from '@components/layout/TagsBar';
import { EnumTagsContext } from '@constants/tags-context';

const VideoContainer: FC = () => {
    return (
        <div data-content-padding className="d-block">
            <TagsBar context={EnumTagsContext.VIDEO} />
            <div className="mt-5">
                <VideoList fetched={true} error={null} videos={[]} myVideos={false} hasExclusive={false} />
            </div>
        </div>
    );
};

export default VideoContainer;
