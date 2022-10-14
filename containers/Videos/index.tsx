import React, { FC, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IVideo } from '@interfaces/api';
import { useRouter } from 'next/router';
import { IRootState } from '@redux/reducers';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import TagsBar from '@components/layout/TagsBar';
import { IUnknownObject } from '@interfaces/app';
import getAllVideosAction from '@redux/videos/all';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import VideoList from '@components/common/VideoList';
import getVideosTagsAction from '@redux/videos/tags';
import ServerError from '@components/common/ServerError';
import { EnumTagsContext } from '@constants/tags-context';
import { CONTENT_LIMIT, START_PAGE } from '@constants/app';
import VideoListSkeleton from '@components/skeleton/VideoList';

import styles from './index.module.scss';

interface IVideoParams {
    page: number;
    tag?: string;
    limit: number;
    search?: string;
    category?: string;
}

const VideoContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { query, asPath, push } = useRouter();
    const [activeTag, setActiveTag] = useState<string>((query?.tag as string) || 'all');

    const [videos, setVideos] = useState<IVideo[]>([]);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [params, setParams] = useState<IVideoParams>({
        page: START_PAGE,
        limit: CONTENT_LIMIT,
    });

    const { loading: loadingTags, data: tags, error } = useSelector(({ videos: { tags } }: IRootState) => tags);
    const { data, error: errVideos, loading: loadingVideos } = useSelector(({ videos: { all } }: IRootState) => all);

    useEffect(() => {
        dispatch(getVideosTagsAction());
    }, [dispatch]);

    useEffect(() => {
        const { category, search, tag } = query as IUnknownObject;
        dispatch(getAllVideosAction({ page: START_PAGE, limit: CONTENT_LIMIT, search, category, tag })).then((res) => {
            if (res.type === 'videos/all/fulfilled') {
                setIsFirstLoad(false);
                setVideos(getPayload(res.payload).videos);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, asPath]);

    const onTagSelect = (tag: string): void => {
        setActiveTag(tag);
        if (tag === 'all') push(ALL_VIDEOS_PATH);
        else {
            push({
                query: { tag },
                pathname: ALL_VIDEOS_PATH,
            });
        }
    };

    const fetchMoreVideos = (params: IVideoParams): void => {
        const { page, limit } = params;
        const { category, search } = query as IUnknownObject;
        setParams({ limit, page, search, category });

        dispatch(getAllVideosAction({ limit, page, search, category })).then((res) => {
            if (res.type === 'videos/all/fulfilled') {
                setVideos([...videos, ...getPayload(res.payload).videos]);
            }
        });
    };

    return (
        <div data-content-padding className={styles.videos}>
            <TagsBar
                error={error}
                loading={loadingTags}
                activeTag={activeTag}
                onTagSelect={onTagSelect}
                context={EnumTagsContext.VIDEO}
                tags={tags as unknown as string[]}
            />
            <div className="mt-5">
                {errVideos && isFirstLoad ? (
                    <ServerError
                        error={errVideos}
                        onRefresh={() => {
                            const { limit, page } = params;
                            dispatch(getAllVideosAction({ limit, page }));
                        }}
                    />
                ) : loadingVideos ? (
                    <VideoListSkeleton size={8} />
                ) : (
                    <InfiniteScroll
                        dataLength={videos?.length}
                        hasMore={videos.length < data?.count}
                        className={isEmpty(videos) ? '' : 'pb-5'}
                        loader={
                            <div className="mt-5">
                                <VideoListSkeleton />
                            </div>
                        }
                        next={() => {
                            const { limit, page } = params;
                            const { category, search, tag } = query as IUnknownObject;
                            fetchMoreVideos({ limit, page: page + 1, search, category, tag });
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
