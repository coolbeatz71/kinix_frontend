import { FC, Fragment, useCallback, useEffect } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IPlaylist } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import EmptyData from '@components/common/EmptyData';
import SectionTitle from '@components/common/SectionTitle';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import getAllPlaylistsDetailsAction from '@redux/playlists/details';

const DynamicPlaylistCard = dynamic(() => import('@components/cards/Playlist'));
const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicPlaylistsListSkeleton = dynamic(() => import('@components/skeleton/PlaylistsList'));

const PlaylistsList: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        error,
        loading,
        fetched,
        data: playlists,
    } = useSelector(({ playlists: { details } }: IRootState) => details);

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
            ) : fetched && isEmpty(playlists) ? (
                <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noPlaylistFound')} />
            ) : (
                <Row align="middle" gutter={[32, 24]}>
                    {(playlists as IPlaylist[])?.map((playlist) => (
                        <Col key={playlist.slug} xs={24} sm={24} md={24} lg={12}>
                            <DynamicPlaylistCard playlist={playlist} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};

export default PlaylistsList;
