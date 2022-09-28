import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IVideo } from '@interfaces/api';
import { useRouter } from 'next/router';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import TagsBar from '@components/layout/TagsBar';
import { IUnknownObject } from '@interfaces/app';
import getAllVideosAction from '@redux/videos/all';
import VideoList from '@components/common/VideoList';
import getVideosTagsAction from '@redux/videos/tags';
import { EnumTagsContext } from '@constants/tags-context';
import VideoListSkeleton from '@components/skeleton/VideoList';
import ServerError from '@components/common/ServerError';

import styles from './index.module.scss';

interface IVideoParams {
    page: number;
    tag?: string;
    limit: number;
    search?: string;
    category?: string;
}

const START_PAGE = 1;
const VIDEOS_LIMIT = 4;

const VideoContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { query, asPath } = useRouter();

    const [videos, setVideos] = useState<IVideo[]>([]);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [params, setParams] = useState<IVideoParams>({
        page: START_PAGE,
        limit: VIDEOS_LIMIT,
    });

    const { loading: loadingTags, data: tags, error } = useSelector(({ videos: { tags } }: IRootState) => tags);
    const { data, error: errVideos, loading: loadingVideos } = useSelector(({ videos: { all } }: IRootState) => all);

    useEffect(() => {
        dispatch(getVideosTagsAction());
    }, [dispatch]);

    useEffect(() => {
        const { category, search } = query as IUnknownObject;
        dispatch(getAllVideosAction({ page: START_PAGE, limit: VIDEOS_LIMIT, search, category })).then((res) => {
            if (res.type === 'videos/all/fulfilled') {
                setIsFirstLoad(false);
                setVideos(res.payload.videos);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, asPath]);

    // const getVideoByTags = () => {};
    //TODO: should work on getting video by tags, and categories and search video

    const fetchMoreVideos = (params: IVideoParams): void => {
        const { page, limit } = params;
        const { category, search } = query as IUnknownObject;
        setParams({ limit, page, search, category });

        dispatch(getAllVideosAction({ limit, page, search, category })).then((res) => {
            if (res.type === 'videos/all/fulfilled') setVideos([...videos, ...res.payload.videos]);
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
                    <ServerError
                        onRefresh={() => {
                            const { limit, page } = params;
                            dispatch(getAllVideosAction({ limit, page }));
                        }}
                    />
                ) : loadingVideos ? (
                    <VideoListSkeleton size={8} />
                ) : (
                    <InfiniteScroll
                        className="pb-5"
                        dataLength={videos?.length}
                        hasMore={videos.length < data?.count}
                        loader={
                            <div className="mt-5">
                                <VideoListSkeleton />
                            </div>
                        }
                        next={() => {
                            const { limit, page } = params;
                            const { category, search } = query as IUnknownObject;
                            fetchMoreVideos({ limit, page: page + 1, search, category });
                        }}
                    >
                        <VideoList videos={videos} myVideos={false} isExclusive={false} />
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
};

export default VideoContainer;
