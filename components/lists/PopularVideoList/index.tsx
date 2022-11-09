import { FC, Fragment, useEffect } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getPopularVideosAction from '@redux/videos/popular';

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicVideoListSkeleton = dynamic(() => import('@components/skeleton/VideoList'));
const DynamicVideoCardVertical = dynamic(() => import('@components/cards/Video/VideoCardVertical'));

const PopularVideoList: FC = () => {
    const dispatch = useAppDispatch();
    const { error, data: videos, loading } = useSelector(({ videos: { popular } }: IRootState) => popular);

    useEffect(() => {
        dispatch(getPopularVideosAction());
    }, [dispatch]);

    return (
        <Fragment>
            {error ? (
                <DynamicServerError error={error} onRefresh={() => dispatch(getPopularVideosAction())} />
            ) : loading ? (
                <DynamicVideoListSkeleton size={8} isPopular />
            ) : (
                <Row gutter={[16, 32]}>
                    {videos?.map((video) => (
                        <Col xs={24} sm={12} md={8} key={video?.slug}>
                            <DynamicVideoCardVertical video={video as IVideo} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};

export default PopularVideoList;
