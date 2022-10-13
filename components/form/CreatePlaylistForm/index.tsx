import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { titleValidator } from './validator';
import FloatTextInput from '@components/common/TextInput';

const { Item } = Form;

export interface ICreatePlaylistFormProps {
    videoId: number | undefined;
}

const CreatePlaylistForm: FC<ICreatePlaylistFormProps> = ({ videoId: _ }) => {
    const { t } = useTranslation();

    const onSubmit = (): void => {
        //
    };

    return (
        <Form name="create_playlist" layout="vertical" onFinish={onSubmit}>
            <Item name="title" validateTrigger={['onSubmit', 'onBlur']} rules={titleValidator(t('playlistTitle'))}>
                <FloatTextInput label={t('playlistTitle')} placeholder={t('playlistPlaceholder')} required>
                    <Input maxLength={150} showCount />
                </FloatTextInput>
            </Item>

            <Button ghost block type="primary" htmlType="submit" className="d-inline-block">
                {t('createPlaylist')}
            </Button>
        </Form>
    );
};

export default CreatePlaylistForm;
