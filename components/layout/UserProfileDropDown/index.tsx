import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import truncate from 'lodash/truncate';
import upperFirst from 'lodash/upperFirst';
import { BellFilled, UserOutlined } from '@ant-design/icons';
import { Space, Button, Badge, Dropdown, Avatar } from 'antd';
import { ICurrentUser } from '@interfaces/user';
import { getBgColor } from '@helpers/getBgColor';

const DynamicUserProfileMenu = dynamic(() => import('@components/common/UserProfileMenu'));

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
        <Space size={48}>
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
                open={openDropdown}
                className={className}
                placement="bottomLeft"
                overlay={
                    <DynamicUserProfileMenu
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
