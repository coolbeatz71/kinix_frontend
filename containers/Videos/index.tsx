import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';
import { IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import TagsBar from '@components/layout/TagsBar';
import { IUnknownObject } from '@interfaces/app';
import getAllVideosAction from '@redux/videos/all';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import getVideosTagsAction from '@redux/videos/tags';
import { EnumTagsContext } from '@constants/tags-context';
import { CONTENT_LIMIT, START_PAGE } from '@constants/app';

const DynamicVideoList = dynamic(() => import('@components/lists/VideoList'));
const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicVideoListSkeleton = dynamic(() => import('@components/skeleton/VideoList'));

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
                setVideos(getPayload(res).data.videos);
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
                setVideos([...videos, ...getPayload(res).data.videos]);
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
                    <DynamicServerError
                        error={errVideos}
                        onRefresh={() => {
                            const { limit, page } = params;
                            dispatch(getAllVideosAction({ limit, page }));
                        }}
                    />
                ) : loadingVideos ? (
                    <DynamicVideoListSkeleton size={8} />
                ) : (
                    <InfiniteScroll
                        dataLength={videos?.length}
                        hasMore={videos?.length < data?.count}
                        className={isEmpty(videos) ? '' : 'pb-5'}
                        loader={
                            <div className="mt-5">
                                <DynamicVideoListSkeleton />
                            </div>
                        }
                        next={() => {
                            const { limit, page } = params;
                            const { category, search, tag } = query as IUnknownObject;
                            fetchMoreVideos({ limit, page: page + 1, search, category, tag });
                        }}
                    >
                        <DynamicVideoList videos={videos} myVideos={false} isExclusive={false} />
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
};

export default VideoContainer;
