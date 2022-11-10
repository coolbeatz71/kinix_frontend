import React, { FC, useState } from 'react';
import { UserOutlined } from 'icons';
import { BsFillGridFill } from 'react-icons/bs';

import Button from 'antd/lib/button';
import Avatar from 'antd/lib/avatar';
import Dropdown from 'antd/lib/dropdown';

import { ICurrentUser } from '@interfaces/user';
import { getBgColor } from '@helpers/getBgColor';
import UserProfileMenu from '@components/common/UserProfileMenu';
import UserAuthMobileMenu from '@components/layout/UserAuthMobileMenu';

import styles from './index.module.scss';

export interface IUserMobileDropDownProps {
    currentUser: ICurrentUser;
}

const UserMobileDropDown: FC<IUserMobileDropDownProps> = ({ currentUser }) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <Dropdown
            open={openDropdown}
            placement="bottomLeft"
            className={styles.userMobileDropdown}
            overlay={
                currentUser?.isLoggedIn ? (
                    <UserProfileMenu
                        email={currentUser.email}
                        avatar={currentUser.image}
                        userName={currentUser.userName}
                        setOpenDropdown={setOpenDropdown}
                        phoneNumber={currentUser.phoneNumber}
                    />
                ) : (
                    <UserAuthMobileMenu
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        className={styles.userMobileDropdown__authMenu}
                    />
                )
            }
        >
            {currentUser?.isLoggedIn ? (
                <Button
                    type="link"
                    onClick={() => setOpenDropdown(!openDropdown)}
                    icon={
                        <Avatar
                            icon={<UserOutlined />}
                            src={currentUser.image}
                            style={{
                                backgroundColor: getBgColor(currentUser.userName),
                            }}
                        />
                    }
                />
            ) : (
                <Button ghost type="primary" icon={<BsFillGridFill />} onClick={() => setOpenDropdown(!openDropdown)} />
            )}
        </Dropdown>
    );
};

export default UserMobileDropDown;
