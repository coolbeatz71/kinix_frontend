import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import TagsBar from '@components/layout/TagsBar';
import getAllVideosAction from '@redux/videos/all';
import VideoList from '@components/common/VideoList';
import getVideosTagsAction from '@redux/videos/tags';
import { EnumTagsContext } from '@constants/tags-context';
import VideoListSkeleton from '@components/skeleton/VideoList';
import ServerError from '@components/common/ServerError';

import styles from './index.module.scss';

const VideoContainer: FC = () => {
    const dispatch = useAppDispatch();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [params, setParams] = useState<{
        limit: number;
        page: number;
    }>({
        page: 1,
        limit: 20,
    });

    const { data, error: errVideos, loading: loadingVideos } = useSelector(({ videos: { all } }: IRootState) => all);
    const { loading: loadingTags, data: tags, error } = useSelector(({ videos: { tags } }: IRootState) => tags);

    useEffect(() => {
        dispatch(getVideosTagsAction());
        fetchVideos(params.limit, params.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // const getVideoByTags = () => {};
    //TODO: should work on getting video by tags, and categories and search video

    const fetchVideos = (limit: number, page: number): void => {
        dispatch(getAllVideosAction({ limit, page })).then((res) => {
            if (res.type === 'videos/all/fulfilled') {
                setIsFirstLoad(false);
                setParams({ limit, page: params.page + 1 });
                setVideos([...videos, ...res.payload.videos]);
            }
        });
    };

    return (
        <div data-content-padding className={styles.videos}>
            <TagsBar
                error={error}
                loading={loadingTags}
                context={EnumTagsContext.VIDEO}
                tags={tags as unknown as string[]}
            />
            <div className="mt-5">
                {errVideos && isFirstLoad ? (
                    <ServerError onRefresh={() => fetchVideos(params.limit, params.page)} />
                ) : loadingVideos ? (
                    <VideoListSkeleton size={8} />
                ) : (
                    <InfiniteScroll
                        dataLength={videos?.length}
                        hasMore={videos.length < data?.count}
                        loader={
                            <div className="mt-5">
                                <VideoListSkeleton />
                            </div>
                        }
                        next={() => fetchVideos(params.limit, params.page)}
                    >
                        <VideoList videos={videos} myVideos={false} isExclusive={false} />
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
};

export default VideoContainer;
