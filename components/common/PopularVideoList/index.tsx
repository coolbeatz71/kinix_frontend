import React, { FC, Fragment, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import getPopularVideosAction from '@redux/videos/popular';
import VideoCardVertical from '@components/common/Cards/Video/VideoCardVertical';
import { IVideo } from '@interfaces/api';
import ServerError from '../ServerError';
import VideoListSkeleton from '@components/skeleton/VideoList';

const PopularVideoList: FC = () => {
    const dispatch = useAppDispatch();
    const { error, data: videos, loading } = useSelector(({ videos: { popular } }: IRootState) => popular);

    useEffect(() => {
        dispatch(getPopularVideosAction());
    }, [dispatch]);

    return (
        <Fragment>
            {error ? (
                <ServerError error={error} onRefresh={() => dispatch(getPopularVideosAction())} />
            ) : loading ? (
                <VideoListSkeleton size={8} isPopular />
            ) : (
                <Row gutter={[16, 32]}>
                    {videos?.map((video) => (
                        <Col xs={24} sm={12} md={8} key={video?.slug}>
                            <VideoCardVertical video={video as IVideo} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};

export default PopularVideoList;
