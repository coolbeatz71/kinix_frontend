import React, { FC } from 'react';
import { BellFilled, UserOutlined } from '@ant-design/icons';
import { getBgColor } from '@helpers/getBgColor';
import { Space, Button, Badge, Dropdown, Avatar } from 'antd';
import UserProfileMenu from '@components/common/UserProfileMenu';
import { ICurrentUser } from '@interfaces/user';
import { truncate, upperFirst } from 'lodash';

export interface IUserProfileDropDownProps {
    className: string;
    openDropdown: boolean;
    currentUser: ICurrentUser;
    setOpenDropdown: (val: boolean) => void;
}

const UserProfileDropDown: FC<IUserProfileDropDownProps> = ({
    className,
    currentUser,
    openDropdown,
    setOpenDropdown,
}) => {
    return (
        <Space size="middle">
            <Button
                type="text"
                shape="circle"
                icon={
                    <Badge count={1} size="small">
                        <BellFilled />
                    </Badge>
                }
            />
            <Dropdown
                className={className}
                placement="bottomLeft"
                visible={openDropdown}
                overlay={
                    <UserProfileMenu
                        email={currentUser.email}
                        avatar={currentUser.image}
                        userName={currentUser.userName}
                        setOpenDropdown={setOpenDropdown}
                        phoneNumber={currentUser.phoneNumber}
                    />
                }
            >
                <Button
                    type="link"
                    onClick={() => setOpenDropdown(!openDropdown)}
                    icon={
                        <Avatar
                            size="small"
                            icon={<UserOutlined />}
                            src={currentUser.image}
                            style={{
                                backgroundColor: getBgColor(currentUser.userName),
                            }}
                        />
                    }
                >
                    {upperFirst(
                        truncate(currentUser.userName, {
                            length: 10,
                        }),
                    )}
                </Button>
            </Dropdown>
        </Space>
    );
};

export default UserProfileDropDown;
