import { FC, useState } from 'react';
import { UserOutlined } from 'icons';
import truncate from 'lodash/truncate';
import upperFirst from 'lodash/upperFirst';

import Space from 'antd/lib/space';
import Avatar from 'antd/lib/avatar';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';

import { ICurrentUser } from '@interfaces/user';
import { getBgColor } from '@helpers/getBgColor';
import NotificationDropDown from '../NotificationDropDown';
import UserProfileMenu from '@components/common/UserProfileMenu';

export interface IUserProfileDropDownProps {
    className: string;
    currentUser: ICurrentUser;
}

const UserProfileDropDown: FC<IUserProfileDropDownProps> = ({ className, currentUser }) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <Space size={48}>
            <NotificationDropDown />
            <Dropdown
                open={openDropdown}
                className={className}
                placement="bottomLeft"
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
