import React, { FC, Fragment, useState } from 'react';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { RiPlayListAddFill } from 'react-icons/ri';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CreatePlaylistForm from '@components/form/CreatePlaylistForm';

import styles from './index.module.scss';

export interface IPlaylistModalProps {
    slug: string;
    closeMenu: () => void;
    videoId: number | undefined;
}

const PlaylistModal: FC<IPlaylistModalProps> = ({ slug: _, videoId, closeMenu }) => {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(false);
    const [openPlaylistForm, setOpenPlaylistForm] = useState(false);

    return (
        <Fragment>
            <Button
                type="text"
                icon={<RiPlayListAddFill className="anticon" />}
                onClick={() => {
                    closeMenu();
                    setOpenModal(true);
                }}
                className={styles.playlist__button}
            >
                {t('addToPlaylist')}
            </Button>
            <Modal
                width={420}
                footer={
                    !openPlaylistForm ? (
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
                        <CreatePlaylistForm videoId={videoId} />
                    )
                }
                destroyOnClose
                visible={openModal}
                title={t('playlistModalTitle')}
                className={styles.playlist__modal}
                closeIcon={<CloseCircleOutlined />}
                onCancel={() => {
                    setOpenModal(false);
                    setOpenPlaylistForm(false);
                }}
            ></Modal>
        </Fragment>
    );
};

export default PlaylistModal;
