import React, { FC, useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import uploadImageCloudinary from 'services/cloudinary';
import { EditOutlined, LoadingOutlined, UserOutlined } from 'icons';
import { Avatar, Button, Typography, Upload, message, Spin, Card } from 'antd';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { MAX_FILE_SIZE } from '@constants/app';
import { getBgColor } from '@helpers/getBgColor';
import getNotification from '@helpers/getNotification';
import updateAvatarAction, { resetUpdateAvatarAction } from '@redux/auth/updateAvatar';
import 'antd/es/slider/style';

import styles from './index.module.scss';

const { Title } = Typography;

export interface IAvatarCardProps {
    userName: string;
    loading: boolean;
    image: string | null;
}

type FileType = string | boolean | void | File | Blob;

const AvatarCard: FC<IAvatarCardProps> = ({ image, userName, loading }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [avatar, setAvatar] = useState<string | null>(image);
    const { loading: updating } = useSelector(({ auth: { updateAvatar } }: IRootState) => updateAvatar);

    useEffect(() => {
        resetUpdateAvatarAction()(dispatch);
    }, [dispatch]);

    const beforeCrop = (file: File): boolean => {
        const isPNG = file.type === 'image/png';
        const isJPG = file.type === 'image/jpeg';
        const isFileBig = file.size > MAX_FILE_SIZE;

        if (isFileBig) {
            message.error(t('maxImageSizeErr'));
            return false;
        }
        if (!isPNG && !isJPG) {
            message.error(t('imageFormatErr'));
            return false;
        }
        return true;
    };

    const onUpload = async (file: FileType): Promise<void> => {
        try {
            const imageUrl = await uploadImageCloudinary(file as File, image, 'avatars');
            if (typeof imageUrl === 'string') {
                dispatch(
                    updateAvatarAction({
                        dispatch,
                        avatar: imageUrl as string,
                    }),
                ).then((res) => {
                    if (res.type === 'auth/updateAvatar/fulfilled') {
                        setAvatar(imageUrl as string);
                        getNotification('success', getPayload(res).message);
                    }
                });
            }
        } catch (err) {
            getNotification('error', (err as Error)?.message);
        }
    };

    return (
        <Card bordered className={styles.avatarCard}>
            <Title level={4} data-title>
                {t('profilePicture')}
            </Title>
            <div className="d-flex justify-content-center">
                <Avatar
                    size={98}
                    src={avatar}
                    style={{ backgroundColor: getBgColor(userName) }}
                    icon={
                        loading || updating ? (
                            <Spin size="large" indicator={<LoadingOutlined spin />} />
                        ) : (
                            <UserOutlined />
                        )
                    }
                />
                <div>
                    <ImgCrop
                        grid
                        zoom
                        rotate
                        shape="round"
                        onModalOk={onUpload}
                        beforeCrop={beforeCrop}
                        modalCancel={t('cancel')}
                        modalTitle={t('modifyImage')}
                        modalClassName={styles.avatarCard__cropper}
                        cropperProps={{
                            cropSize: {
                                width: 250,
                                height: 250,
                            },
                        }}
                    >
                        <Upload showUploadList={false} accept="image/png, image/jpeg">
                            <Button
                                shape="circle"
                                type="primary"
                                icon={<EditOutlined />}
                                className={styles.avatarCard__button}
                            />
                        </Upload>
                    </ImgCrop>
                </div>
            </div>
        </Card>
    );
};

export default AvatarCard;
