import { FC } from 'react';
import Link from 'next/link';
import truncate from 'lodash/truncate';
import upperFirst from 'lodash/upperFirst';
import { SettingOutlined, UserOutlined } from 'icons';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Avatar from 'antd/lib/avatar';
import Typography from 'antd/lib/typography';

import useDarkLight from '@hooks/useDarkLight';
import { SETTING_PATH } from '@constants/paths';
import { getBgColor } from '@helpers/getBgColor';

import styles from './index.module.scss';

const { Text } = Typography;

export interface IUserAvatarProps {
    avatar: string;
    userName: string;
    onClick: () => void;
}

const UserAvatar: FC<IUserAvatarProps> = ({ userName, avatar, onClick }) => {
    const { value } = useDarkLight();
    const avatarSize = { sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 };

    return (
        <Row data-theme={value} justify="space-between" align="middle" className={styles.userVatar}>
            <Col span={2}>
                <Avatar
                    data-avatar
                    src={avatar}
                    size={avatarSize}
                    icon={<UserOutlined />}
                    style={{
                        backgroundColor: getBgColor(userName),
                    }}
                />
            </Col>
            <Col span={18}>
                <Text data-text>
                    {upperFirst(
                        truncate(userName, {
                            length: 20,
                        }),
                    )}
                </Text>
            </Col>
            <Col span={3} className="d-flex justify-content-center">
                <Link href={SETTING_PATH} passHref>
                    <SettingOutlined data-setting onClick={onClick} />
                </Link>
            </Col>
        </Row>
    );
};

export default UserAvatar;
