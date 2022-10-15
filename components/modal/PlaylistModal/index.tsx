import React, { FC, Fragment, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Empty, message, Modal, RadioChangeEvent, Result } from 'antd';
import { RiPlayListAddFill } from 'react-icons/ri';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getAllPlaylistsAction from '@redux/playlists/all';
import addVideoToPlaylistAction from '@redux/playlists/add';
import CreatePlaylistForm from '@components/form/CreatePlaylistForm';
import PlaylistListSkeleton from '@components/skeleton/PlaylistsList';
import PlaylistRadioGroup from '@components/common/PlaylistRadioGroup';

import styles from './index.module.scss';

export interface IPlaylistModalProps {
    videoId: number;
    closeMenu: () => void;
}

const PlaylistModal: FC<IPlaylistModalProps> = ({ videoId, closeMenu }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [openPlaylistForm, setOpenPlaylistForm] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState<{ title: string; slug: string }>({
        slug: '',
        title: '',
    });

    const { loading: addLoading } = useSelector(({ playlists: { add } }: IRootState) => add);
    const { data: playlists, error, loading } = useSelector(({ playlists: { all } }: IRootState) => all);

    useEffect(() => {
        dispatch(getAllPlaylistsAction());
        setSelectedPlaylist({ slug: '', title: '' });
    }, [dispatch]);

    const onSelectPlaylist = (e: RadioChangeEvent): void => {
        const { value } = e.target;
        setSelectedPlaylist(value);
        dispatch(addVideoToPlaylistAction({ slug: value.slug, title: value.title, videoId })).then((res) => {
            if (res.type === 'playlists/add/rejected') message.error(getPayload(res)?.message);
            else if (res.type === 'playlists/add/fulfilled') {
                setOpenModal(false);
                setOpenPlaylistForm(false);
                dispatch(getAllPlaylistsAction());
                message.success(getPayload(res).message);
            }
        });
    };

    return (
        <Fragment>
            <Button
                type="text"
                onClick={() => {
                    closeMenu();
                    setOpenModal(true);
                }}
                className={styles.playlist__button}
                icon={<RiPlayListAddFill className="anticon" />}
            >
                {t('addToPlaylist')}
            </Button>
            <Modal
                width={350}
                footer={
                    isEmpty(error) && (
                        <Fragment>
                            {!openPlaylistForm ? (
                                <Button
                                    ghost
                                    block
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setOpenPlaylistForm(true)}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    {t('newPlaylist')}
                                </Button>
                            ) : (
                                <CreatePlaylistForm
                                    videoId={videoId}
                                    setOpenModal={setOpenModal}
                                    setOpenPlaylistForm={setOpenPlaylistForm}
                                />
                            )}
                        </Fragment>
                    )
                }
                destroyOnClose
                open={openModal}
                title={t('playlistModalTitle')}
                className={styles.playlist__modal}
                closeIcon={<CloseCircleOutlined />}
                onCancel={() => {
                    setOpenModal(false);
                    setOpenPlaylistForm(false);
                }}
            >
                {loading ? (
                    <PlaylistListSkeleton />
                ) : error ? (
                    <Result status="error" subTitle={error?.message || t('serverErrorDesc')} />
                ) : playlists?.count === 0 ? (
                    <Empty description={t('noPlaylistFound')} className="my-5" />
                ) : (
                    <PlaylistRadioGroup
                        loading={addLoading}
                        playlists={playlists}
                        selectedPlaylist={selectedPlaylist}
                        onSelectPlaylist={onSelectPlaylist}
                    />
                )}
            </Modal>
        </Fragment>
    );
};

export default PlaylistModal;
