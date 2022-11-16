import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { UserOutlined, SettingOutlined, LogoutOutlined, LoadingOutlined, StarOutlined } from 'icons';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Spin from 'antd/lib/spin';
import Menu from 'antd/lib/menu';
import Avatar from 'antd/lib/avatar';
import Typography from 'antd/lib/typography';

import { IRootState } from '@redux/reducers';
import logoutAction from '@redux/auth/logout';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { getBgColor } from '@helpers/getBgColor';
import getNotification from '@helpers/getNotification';
import { FAVORITE_PATH, HOME_PATH, SETTING_PATH } from '@constants/paths';

import styles from './index.module.scss';

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
    const { replace } = useRouter();
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();
    const { error, loading } = useSelector(({ auth: { logout } }: IRootState) => logout);

    useEffect(() => {
        if (error) getNotification('error', error?.message);
    }, [error]);

    const onLogout = (): void => {
        dispatch(logoutAction({ dispatch })).then((res) => {
            if (res.type === 'auth/logout/fulfilled') {
                setOpenDropdown(false);
                replace(HOME_PATH);
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
                        style={{ backgroundColor: getBgColor(userName) }}
                    />
                </Col>
                <Col span={24} className="text-center my-3">
                    <Text strong>{email}</Text>
                    <br />
                    <Text data-phone>{phoneNumber}</Text>
                </Col>
            </Row>
            <Item icon={<StarOutlined />} key="favorite">
                <Link href={FAVORITE_PATH}>{t('myFavorite')}</Link>
            </Item>
            <Item icon={<SettingOutlined />} key="settings">
                <Link href={SETTING_PATH}>{t('settings')}</Link>
            </Item>
            <Item danger data-signout icon={<LogoutOutlined />} onClick={onLogout} key="logout">
                {loading ? <Spin indicator={<LoadingOutlined />} /> : t('logout')}
            </Item>
        </Menu>
    );
};

export default UserProfileMenu;
