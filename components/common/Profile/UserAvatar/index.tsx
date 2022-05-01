import React, { FC } from 'react';
import { Avatar, Col, Row, Typography } from 'antd';
import { truncate } from 'lodash';
import useDarkLight from '@hooks/useDarkLight';
import { SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { HOME_PATH } from '@constants/paths';

import styles from './index.module.scss';

const { Text } = Typography;

export interface IUserAvatarProps {
    userName: string;
    onClick: () => void;
}

const UserAvatar: FC<IUserAvatarProps> = ({ userName }) => {
    const { value } = useDarkLight();
    const avatarSize = { sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 };
    return (
        <Row data-theme={value} justify="space-between" align="middle" className={styles.userVatar}>
            <Col span={3}>
                <Avatar data-avatar size={avatarSize} src="https://joeschmoe.io/api/v1/random" />
            </Col>
            <Col span={18}>
                <Text data-text>
                    {truncate(userName, {
                        length: 20,
                    })}
                </Text>
            </Col>
            <Col span={3} className="d-flex justify-content-center">
                <Link href={HOME_PATH} passHref>
                    <SettingOutlined data-setting />
                </Link>
            </Col>
        </Row>
    );
};

export default UserAvatar;
