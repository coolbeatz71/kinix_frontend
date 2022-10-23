import React, { FC, Fragment, useCallback, useEffect } from 'react';
import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import EmptyData from '@components/common/EmptyData';
import SectionTitle from '@components/common/SectionTitle';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import getAllPlaylistsDetailsAction from '@redux/playlists/details';
import { IPlaylist } from '@interfaces/api';

const DynamicPlaylistCard = dynamic(() => import('@components/cards/Playlist'));
const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicPlaylistsListSkeleton = dynamic(() => import('@components/skeleton/PlaylistsList'));

const PlaylistsList: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { loading, data: playlists, error } = useSelector(({ playlists: { details } }: IRootState) => details);

    const loadPlaylists = useCallback(() => {
        dispatch(getAllPlaylistsDetailsAction());
    }, [dispatch]);

    useEffect(() => {
        loadPlaylists();
    }, [loadPlaylists]);
    return (
        <Fragment>
            <SectionTitle
                isRelated
                title={`${t('myPlaylists')} ${playlists?.length > 0 ? `(${playlists?.length})` : ''}`}
            />

            {error ? (
                <DynamicServerError error={error} onRefresh={loadPlaylists} />
            ) : loading ? (
                <DynamicPlaylistsListSkeleton />
            ) : isEmpty(playlists) ? (
                <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noPlaylistFound')} />
            ) : (
                <Row align="middle" gutter={[32, 24]}>
                    {(playlists as IPlaylist[])?.map((playlist) => (
                        <Col key={playlist.slug} xs={24} sm={24} md={12}>
                            <DynamicPlaylistCard playlist={playlist} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};

export default PlaylistsList;
