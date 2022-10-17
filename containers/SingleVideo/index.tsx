import React, { FC, Fragment, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Col, Grid, Row } from 'antd';
import { useSelector } from 'react-redux';
import { IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { IYoutubeVideo } from '@interfaces/youtube';
import VideosTabs from '@components/videos/VideosTabs';
import ServerError from '@components/common/ServerError';
import VideoPlayer from '@components/videos/VideoPlayer';
import getRelatedVideosAction from '@redux/videos/related';
import getYoutubeVideoInfoAction from '@redux/videos/youtube';
import RelatedVideoList from '@components/lists/RelatedVideoList';
import SingleVideoSkeleton from '@components/skeleton/SingleVideo';

const { useBreakpoint } = Grid;

export interface ISingleVideoContainerProps {
    video: IVideo;
}

const SingleVideoContainer: FC<ISingleVideoContainerProps> = ({ video }) => {
    const { lg } = useBreakpoint();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    const {
        data: related,
        error: errRelated,
        loading: loadRelated,
    } = useSelector(({ videos: { related } }: IRootState) => related);
    const {
        error: errYoutube,
        data: youtubeVideo,
        loading: loadYoutube,
    } = useSelector(({ videos: { youtube } }: IRootState) => youtube);

    useEffect(() => {
        const { tags, link, slug } = video as IVideo;
        if (!isEmpty(tags)) {
            dispatch(getYoutubeVideoInfoAction(link));
            dispatch(getRelatedVideosAction({ slug, tags }));
        }
    }, [dispatch, video]);

    const error = errRelated || errYoutube;
    const loading = loadYoutube || loadRelated;

    return (
        <Fragment>
            {error ? (
                <ServerError error={error} onRefresh={() => dispatch(getYoutubeVideoInfoAction(video.link))} />
            ) : loading ? (
                <SingleVideoSkeleton />
            ) : (
                <Row data-theme={value} justify="space-between" gutter={[0, 0]}>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <VideoPlayer video={video} youtubeVideo={youtubeVideo as IYoutubeVideo} />
                        <div className="mt-3">
                            <VideosTabs lyrics={video.lyrics as string} />
                        </div>
                    </Col>
                    {lg && !isEmpty(related) && (
                        <Col lg={8} className="ps-3">
                            <RelatedVideoList videos={related as IVideo[]} />
                        </Col>
                    )}
                </Row>
            )}
        </Fragment>
    );
};

export default SingleVideoContainer;
