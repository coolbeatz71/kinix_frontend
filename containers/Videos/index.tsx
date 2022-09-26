import React, { FC, useEffect, useState } from 'react';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [params, setParams] = useState<{
        limit: number;
        page: number;
    }>({
        page: 1,
        limit: 4,
    });

    const { data, error: errVideos } = useSelector(({ videos: { all } }: IRootState) => all);
    const { loading: loadingTags, data: tags, error } = useSelector(({ videos: { tags } }: IRootState) => tags);

    useEffect(() => {
        dispatch(getVideosTagsAction());
        fetchVideos(params.limit, params.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // const getVideoByTags = () => {};

    const fetchVideos = (limit: number, page: number): void => {
        dispatch(getAllVideosAction({ limit, page })).then((res) => {
            if (res.type === 'videos/all/fulfilled') {
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
                {errVideos ? (
                    <ServerError onRefresh={() => fetchVideos(params.limit, params.page)} />
                ) : (
                    <InfiniteScroll
                        dataLength={videos?.length}
                        hasMore={videos.length < data?.count}
                        loader={
                            <div className="mt-5">
                                <VideoListSkeleton size={8} />
                            </div>
                        }
                        next={() => fetchVideos(params.limit, params.page)}
                        endMessage={
                            <Alert banner type="info" className="mt-4 rounded-1" message={t('scrollingEndMessage')} />
                        }
                    >
                        <VideoList videos={videos} myVideos={false} isExclusive={false} />
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
};

export default VideoContainer;
