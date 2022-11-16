import { FC, Fragment, useCallback, useEffect } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IRate, IVideo } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import EmptyData from '@components/common/EmptyData';
import SectionTitle from '@components/common/SectionTitle';
import getRatesByUserAction from '@redux/ratings/userRates';
import { EnumEmptyDataType } from '@constants/empty-data-type';

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicRelatedVideoCard = dynamic(() => import('@components/cards/Video/RelatedVideo'));
const DynamicFavoriteListSkeleton = dynamic(() => import('@components/skeleton/FavoriteVideosList'));

const RatedVideosList: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { loading, data: rates, error } = useSelector(({ ratings: { userRates } }: IRootState) => userRates);

    const loadRatedVideos = useCallback(() => {
        dispatch(getRatesByUserAction());
    }, [dispatch]);

    useEffect(() => {
        loadRatedVideos();
    }, [loadRatedVideos]);

    return (
        <Fragment>
            <SectionTitle title={`${t('myRatedVideos')} ${!isEmpty(rates) ? `(${rates?.count})` : ''}`} isRelated />
            {error ? (
                <DynamicServerError error={error} onRefresh={loadRatedVideos} />
            ) : loading ? (
                <DynamicFavoriteListSkeleton />
            ) : isEmpty(rates?.rows) ? (
                <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noRatesFound')} />
            ) : (
                <Row align="middle" gutter={[32, 24]}>
                    {rates?.rows?.map((rate: IRate) => (
                        <Col key={rate.id} xs={24} sm={24} md={12} lg={12} xl={8}>
                            <DynamicRelatedVideoCard video={rate.video as IVideo} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};

export default RatedVideosList;
