import React, { FC, useEffect } from 'react';
import { Avatar, Col, Menu, Row, Typography, Spin, notification } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IRootState } from '@redux/reducers';
import { getAvatarColor } from '@helpers/getAvatarColor';
import logoutAction from '@redux/auth/logout';
import { useAppDispatch } from '@redux/store';
import { HOME_PATH, SETTING_PATH } from '@constants/paths';

import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';

const { Item } = Menu;
const { Text } = Typography;

export interface IUserProfileMenuProps {
    avatar?: string | null;
    email: string;
    userName: string;
    phoneNumber: string;
    setOpenDropdown: (val: boolean) => void;
}

const UserProfileMenu: FC<IUserProfileMenuProps> = ({ avatar, email, phoneNumber, userName, setOpenDropdown }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();
    const { error, loading } = useSelector(({ auth: { logout } }: IRootState) => logout);

    useEffect(() => {
        if (error) {
            notification.error({
                key: 'error',
                message: 'Erreur',
                placement: 'bottomRight',
                description: error?.message,
            });
        }
    }, [error]);

    const onLogout = (): void => {
        dispatch(logoutAction({ dispatch })).then((res) => {
            if (res.type === 'auth/logout/fulfilled') {
                setOpenDropdown(false);
                window.location.href = HOME_PATH;
            }
        });
    };

    return (
        <Menu data-theme={value} className={styles.profile} onMouseLeave={() => setOpenDropdown(false)}>
            <Row align="middle" justify="center">
                <Col span={24} className={styles.profile__avatar}>
                    <Avatar
                        size={98}
                        src={avatar}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: getAvatarColor(userName) }}
                    />
                </Col>
                <Col span={24} className="text-center my-3">
                    <Text strong>{email}</Text>
                    <br />
                    <Text data-phone>{phoneNumber}</Text>
                </Col>
            </Row>
            <Item icon={<SettingOutlined />}>
                <Link href={SETTING_PATH}>{t('settings')}</Link>
            </Item>
            <Item danger data-signout icon={<LogoutOutlined />} onClick={onLogout}>
                {loading ? <Spin indicator={<LoadingOutlined />} /> : t('logout')}
            </Item>
        </Menu>
    );
};

export default UserProfileMenu;
