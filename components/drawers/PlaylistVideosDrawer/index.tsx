import React, { FC, useEffect, useState } from 'react';
import numeral from 'numeral';
import dynamic from 'next/dynamic';
import { Col, Drawer, Row, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { CloseCircleOutlined } from 'icons';
import { useTranslation } from 'react-i18next';
import { IPlaylist } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getAllPlaylistsDetailsAction from '@redux/playlists/details';

import styles from './index.module.scss';
import { resetRemoveVideoFromPlaylistAction } from '@redux/playlists/removeVideo';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));
const DynamicPlaylistVideosList = dynamic(() => import('@components/lists/PlaylistVideosList'));

export interface IPlaylistVideosDrawerProps {
    playlist: IPlaylist;
    openDrawer: boolean;
    setOpenDrawer: (v: boolean) => void;
}

const PlaylistVideosDrawer: FC<IPlaylistVideosDrawerProps> = ({ playlist, openDrawer, setOpenDrawer }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [videosCount, setVideosCount] = useState(playlist?.videos?.length || 0);

    const { fetched: fetchedDelete } = useSelector(({ playlists: { removeVideo } }: IRootState) => removeVideo);
    const { loading, error, data, fetched } = useSelector(({ playlists: { single } }: IRootState) => single);

    const onCloseDrawer = (): void => {
        setOpenDrawer(false);
        if (fetchedDelete) dispatch(getAllPlaylistsDetailsAction());
    };

    useEffect(() => {
        if (data && fetched) setVideosCount(data.videos.length);
    }, [data, fetched]);

    useEffect(() => {
        if (openDrawer) dispatch(resetRemoveVideoFromPlaylistAction());
    }, [dispatch, openDrawer]);

    return (
        <Drawer
            width={520}
            placement="right"
            open={openDrawer}
            onClose={onCloseDrawer}
            closeIcon={<CloseCircleOutlined />}
            className={styles.playlistVideosDrawer}
            title={
                <Row justify="space-between" align="middle">
                    <Col>{t('playlistVideos')}</Col>
                    <Col data-total>{videosCount > 0 && numeral(videosCount).format('0,0')}</Col>
                </Row>
            }
        >
            {error ? (
                <DynamicErrorAlert error={error} closable banner showIcon />
            ) : loading ? (
                Array.from(Array(4).keys()).map((i) => (
                    <Skeleton.Button
                        block
                        active
                        key={i}
                        size="large"
                        className={styles.playlistVideosDrawer__skeleton}
                    />
                ))
            ) : (
                <DynamicPlaylistVideosList playlist={playlist} />
            )}
        </Drawer>
    );
};

export default PlaylistVideosDrawer;
