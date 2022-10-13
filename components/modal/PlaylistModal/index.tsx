import React, { FC, Fragment, useState } from 'react';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { RiPlayListAddFill } from 'react-icons/ri';
import { CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

export interface IPlaylistModalProps {
    slug: string;
    closeMenu: () => void;
    videoId: number | undefined;
}

const PlaylistModal: FC<IPlaylistModalProps> = ({ slug, videoId, closeMenu }) => {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(false);

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
                footer={null}
                destroyOnClose
                visible={openModal}
                title={t('playlistModalTitle')}
                className={styles.playlist__modal}
                closeIcon={<CloseCircleOutlined />}
                onCancel={() => setOpenModal(false)}
            ></Modal>
        </Fragment>
    );
};

export default PlaylistModal;
