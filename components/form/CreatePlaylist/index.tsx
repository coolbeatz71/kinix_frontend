import React, { FC, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { titleValidator } from './validator';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import getAllPlaylistsAction from '@redux/playlists/all';
import FloatTextInput from '@components/common/TextInput';
import addVideoToPlaylistAction from '@redux/playlists/add';

import styles from './index.module.scss';

const { Item } = Form;

export interface ICreatePlaylistFormProps {
    videoId: number;
    setOpenModal: (val: boolean) => void;
    setOpenPlaylistForm: (val: boolean) => void;
}

const CreatePlaylistForm: FC<ICreatePlaylistFormProps> = ({ videoId, setOpenModal, setOpenPlaylistForm }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const onSubmit = (formData: { title: string }): void => {
        const { title } = formData;
        setLoading(true);
        dispatch(addVideoToPlaylistAction({ title, videoId })).then((res) => {
            setLoading(false);
            if (res.type === 'playlists/add/rejected') message.error(getPayload(res)?.message);
            else if (res.type === 'playlists/add/fulfilled') {
                setOpenPlaylistForm(false);
                setOpenModal(false);
                dispatch(getAllPlaylistsAction());
                message.success(getPayload(res).message);
            }
        });
    };

    return (
        <Form name="create_playlist" layout="vertical" onFinish={onSubmit} className={styles.createPlaylist}>
            <Item name="title" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator(t('playlistTitle'))}>
                <FloatTextInput label={t('playlistTitle')} placeholder={t('playlistPlaceholder')} required>
                    <Input maxLength={150} showCount />
                </FloatTextInput>
            </Item>

            <Button
                ghost
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                className="d-flex align-items-center justify-content-center"
            >
                {t('createPlaylist')}
            </Button>
        </Form>
    );
};

export default CreatePlaylistForm;
