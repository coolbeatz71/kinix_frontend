import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import numeral from 'numeral';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import truncate from 'lodash/truncate';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';
import { DeleteFilled, ExclamationCircleOutlined } from 'icons';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Tooltip from 'antd/lib/tooltip';
import Typography from 'antd/lib/typography';

import { IPlaylist } from '@interfaces/api';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import deletePlaylistAction from '@redux/playlists/delete';
import getAllPlaylistsDetailsAction from '@redux/playlists/details';
import getYoutubeVideoThumbnail from '@helpers/getYoutubeVideoThumbail';

const DynamicPlaylistVideosDrawer = dynamic(() => import('@components/drawers/PlaylistVideosDrawer'));

import styles from './index.module.scss';

const { confirm } = Modal;
const { Title, Text } = Typography;

export interface IPlaylistCardProps {
    playlist: IPlaylist;
}

const PlaylistCard: FC<IPlaylistCardProps> = ({ playlist }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();
    const defaultCover = playlist?.videos?.[0]?.link || '';

    const [cover, setCover] = useState<string>(defaultCover);
    const [openVideoListModal, setOpenVideoListModal] = useState<boolean>(false);

    const videosLength = playlist?.videos?.length;
    const fallbackImage = '/feedback/empty-playlist.svg';
    const numOfVideos = numeral(videosLength).format('0.[00]a');
    const plural = videosLength && videosLength > 1 ? 'videos' : 'video';

    useEffect(() => {
        setCover(defaultCover);
    }, [defaultCover]);

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
            title: t('deletePlaylistConfirm'),
            icon: <ExclamationCircleOutlined />,
            cancelButtonProps: { type: 'primary', ghost: true, danger: false },
            onOk() {
                dispatch(deletePlaylistAction(playlist?.slug)).then((res) => {
                    if (res.type === 'playlists/delete/fulfilled') {
                        message.success(getPayload(res).message);
                        dispatch(getAllPlaylistsDetailsAction());
                    } else if (res.type === 'playlists/delete/rejected') {
                        message.error(getPayload(res).message);
                    }
                });
            },
        });
    };

    return (
        <div data-theme={value} className={styles.playlistCard}>
            <DynamicPlaylistVideosDrawer
                playlist={playlist}
                openDrawer={openVideoListModal}
                setOpenDrawer={setOpenVideoListModal}
            />
            <Card bordered={false} hoverable>
                <Row justify="space-between" gutter={24}>
                    <Col span={12} className={styles.playlistCard__cover}>
                        {!isEmpty(playlist?.videos?.[0].link) && (
                            <div
                                onClick={() => setOpenVideoListModal(true)}
                                className={styles.playlistCard__cover__image}
                            >
                                <Image
                                    priority
                                    layout="fill"
                                    alt={playlist?.slug}
                                    src={getYoutubeVideoThumbnail(cover) as string}
                                    onError={() => {
                                        setCover(fallbackImage);
                                    }}
                                    onLoadingComplete={(res) => {
                                        if (res.naturalWidth === 0) setCover(fallbackImage);
                                    }}
                                />
                            </div>
                        )}
                    </Col>
                    <Col span={12} data-body>
                        <Title level={5} data-title className="pe-4" onClick={() => setOpenVideoListModal(true)}>
                            {truncate(playlist.title, {
                                length: 45,
                            })}
                        </Title>

                        <div className="d-flex flex-column">
                            <Text data-created-at>
                                <strong>{t('createdAt')}</strong>{' '}
                                {upperFirst(dayjs(playlist?.createdAt).format('MMM MM, YYYY'))}
                            </Text>
                            <Text data-created-at>
                                <strong>{t('lastUpdate')}</strong> {upperFirst(dayjs(playlist?.updatedAt).fromNow())}
                            </Text>
                            <Text data-videos>{videosLength ? `${numOfVideos} ${plural}` : t('noVideos')}</Text>
                        </div>

                        <div className="mt-3 d-flex justify-content-end pe-4">
                            <Tooltip title={t('deletePlaylist')} placement="topRight">
                                <Button
                                    ghost
                                    danger
                                    icon={<DeleteFilled />}
                                    onClick={showDeleteConfirm}
                                    className="d-flex align-items-center"
                                >
                                    {t('delete')}
                                </Button>
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default PlaylistCard;
