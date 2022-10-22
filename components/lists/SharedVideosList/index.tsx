import React, { FC, Fragment, useCallback, useEffect } from 'react';
import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IShare, IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import EmptyData from '@components/common/EmptyData';
import SectionTitle from '@components/common/SectionTitle';
import getSharesByUserAction from '@redux/sharing/userShares';
import { EnumEmptyDataType } from '@constants/empty-data-type';

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicRelatedVideoCard = dynamic(() => import('@components/cards/Video/RelatedVideoCard'));
const DynamicFavoriteListSkeleton = dynamic(() => import('@components/skeleton/FavoriteVideosList'));

const SharedVideosList: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { loading, data: shares, error } = useSelector(({ sharing: { userShares } }: IRootState) => userShares);

    const loadSharedVideos = useCallback(() => {
        dispatch(getSharesByUserAction());
    }, [dispatch]);

    useEffect(() => {
        loadSharedVideos();
    }, [loadSharedVideos]);

    return (
        <Fragment>
            <SectionTitle title={`${t('mySharedVideos')} ${!isEmpty(shares) ? `(${shares?.count})` : ''}`} isRelated />
            {error ? (
                <DynamicServerError error={error} onRefresh={loadSharedVideos} />
            ) : loading ? (
                <DynamicFavoriteListSkeleton />
            ) : isEmpty(shares?.rows) ? (
                <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noSharesFound')} />
            ) : (
                <Row align="middle" gutter={[32, 24]}>
                    {shares?.rows?.map((share: IShare) => (
                        <Col key={share.id} xs={24} sm={12} md={8}>
                            <DynamicRelatedVideoCard video={share.video as IVideo} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};

export default SharedVideosList;
