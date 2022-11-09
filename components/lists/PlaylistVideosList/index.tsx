import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DeleteFilled, ExclamationCircleOutlined } from 'icons';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import List from 'antd/lib/list';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Tooltip from 'antd/lib/tooltip';

import { IRootState } from '@redux/reducers';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import { IPlaylist, IVideo } from '@interfaces/api';
import getSinglePlaylistAction from '@redux/playlists/single';
import RelatedVideoCard from '@components/cards/Video/RelatedVideo';
import removeVideoFromPlaylistAction from '@redux/playlists/removeVideo';

import styles from './index.module.scss';

const { confirm } = Modal;

export interface IPlaylistVideosListProps {
    playlist: IPlaylist;
}

const PlaylistVideosList: FC<IPlaylistVideosListProps> = ({ playlist }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [videos, setVideos] = useState<IVideo[]>(playlist?.videos || []);
    const { data, fetched } = useSelector(({ playlists: { single } }: IRootState) => single);

    useEffect(() => {
        if (data && fetched) setVideos(data.videos);
    }, [data, fetched]);

    return (
        <List
            size="large"
            split={false}
            dataSource={videos}
            itemLayout="vertical"
            className={styles.playlistVideo}
            renderItem={(video) => {
                const showDeleteConfirm = (): void => {
                    confirm({
                        okText: t('yes'),
                        cancelText: t('no'),
                        okButtonProps: {
                            ghost: true,
                            danger: true,
                            type: 'primary',
                        },
                        open: false,
                        title: t('removePlaylistVideoConfirm'),
                        icon: <ExclamationCircleOutlined />,
                        cancelButtonProps: { type: 'primary', ghost: true, danger: false },
                        onOk() {
                            dispatch(
                                removeVideoFromPlaylistAction({ slug: playlist?.slug, videoId: Number(video.id) }),
                            ).then((res) => {
                                if (res.type === 'playlists/removeVideo/fulfilled') {
                                    message.success(getPayload(res).message);
                                    dispatch(getSinglePlaylistAction(playlist?.slug));
                                } else if (res.type === 'playlists/removeVideo/rejected') {
                                    message.error(getPayload(res).message);
                                }
                            });
                        },
                    });
                };

                return (
                    <Row justify="space-between" gutter={12}>
                        <Col span={22}>
                            <RelatedVideoCard bordered video={video} />
                        </Col>
                        <Col span={2}>
                            <Tooltip title={t('removeVideoFromPlaylist')} placement="topRight">
                                <Button ghost danger icon={<DeleteFilled />} onClick={showDeleteConfirm} />
                            </Tooltip>
                        </Col>
                    </Row>
                );
            }}
        />
    );
};

export default PlaylistVideosList;
