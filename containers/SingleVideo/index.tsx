import { FC, Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Grid from 'antd/lib/grid';

import { IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { IYoutubeVideo } from '@interfaces/youtube';
import getRelatedVideosAction from '@redux/videos/related';
import getYoutubeVideoInfoAction from '@redux/videos/youtube';

const DynamicVideosTabs = dynamic(() => import('@components/videos/VideosTabs'));
const DynamicVideoPlayer = dynamic(() => import('@components/videos/VideoPlayer'));
const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicRelatedVideoList = dynamic(() => import('@components/lists/RelatedVideoList'));
const DynamicSingleVideoSkeleton = dynamic(() => import('@components/skeleton/SingleVideo'));

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
                <DynamicServerError error={error} onRefresh={() => dispatch(getYoutubeVideoInfoAction(video.link))} />
            ) : loading ? (
                <DynamicSingleVideoSkeleton />
            ) : (
                <Row data-theme={value} justify="space-between" gutter={[0, 0]}>
                    <Col xs={24} sm={24} md={24} lg={16}>
                        <DynamicVideoPlayer video={video} youtubeVideo={youtubeVideo as IYoutubeVideo} />
                        <div className="mt-3">
                            <DynamicVideosTabs lyrics={video.lyrics as string} />
                        </div>
                    </Col>
                    {lg && !isEmpty(related) && (
                        <Col lg={8} className="ps-3">
                            <DynamicRelatedVideoList videos={related as IVideo[]} />
                        </Col>
                    )}
                </Row>
            )}
        </Fragment>
    );
};

export default SingleVideoContainer;
