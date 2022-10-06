import React, { FC, useState } from 'react';
import { Button, Col, Layout, Row, Space, Grid } from 'antd';
import { isEmpty } from 'lodash';
import getSideNavWidth from '@helpers/getSideNavWidth';
import SearchInput from '@components/common/SearchInput';
import { MenuOutlined } from '@ant-design/icons';
import { ICurrentUser } from '@interfaces/user';
import social from '@constants/social';
import useDarkLight from '@hooks/useDarkLight';
import Logo from '@components/common/Logo';
import { getLanguage } from '@helpers/getLanguage';
import LoginModal from '@components/auth/Login';
import SignUpModal from '@components/auth/SignUp';
import CategoryBar from '../CategoryBar';
import { BsFillGridFill } from 'react-icons/bs';
import UserProfileDropDown from '@components/layout/UserProfileDropDown';
import UserAuthSection from '@components/layout/UserAuthSection';
import LanguageDropDown from '@components/layout/LanguageDropDown';
import { CategoryServerPropsType } from '@context/video-categories';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Header: AntHeader } = Layout;

interface IHeaderProps {
    open: boolean;
    scrolled: string;
    collapsed: boolean;
    isVideoCategory: boolean;
    currentUser: ICurrentUser;
    serverProps: CategoryServerPropsType;
    setOpen: (open: boolean) => void;
    setCollapsed: (collapsed: boolean) => void;
    setOpenSideDrawer: (openSideDrawer: boolean) => void;
}

const Header: FC<IHeaderProps> = ({
    open,
    setOpen,
    scrolled,
    collapsed,
    currentUser,
    serverProps,
    setCollapsed,
    isVideoCategory,
    setOpenSideDrawer,
}) => {
    const { value } = useDarkLight();
    const { lg, md } = useBreakpoint();

    const [openDropdown, setOpenDropdown] = useState(false);

    const userLang: 'en' | 'fr' | string = getLanguage();

    const openSideDrawer = (): void => setOpenSideDrawer(true);
    const handleToggle = (): void => {
        if (collapsed === open) {
            setCollapsed(collapsed);
            setOpen(!open);
        } else {
            setCollapsed(!collapsed);
            setOpen(!open);
        }
    };

    const sideNavWidth = getSideNavWidth(open, collapsed);
    const headerStyles = {
        left: sideNavWidth,
        width: `calc(100% - ${sideNavWidth}px)`,
    };

    const isSidenavClose = !open || collapsed;

    return (
        <AntHeader
            data-theme={value}
            data-scroll={scrolled}
            className={styles.header}
            data-is-category={isVideoCategory}
            data-sidenav-close={isSidenavClose}
            style={lg ? headerStyles : undefined}
        >
            <LoginModal />
            <SignUpModal />

            <Row align="middle" className={styles.header__row} justify="space-between">
                <Col xs={12} sm={12} lg={1} className="p-0">
                    <Button
                        type="text"
                        className="hamburger-menu"
                        size={lg ? 'large' : 'middle'}
                        onClick={lg ? handleToggle : openSideDrawer}
                        icon={<MenuOutlined />}
                    />
                    {!md && <Logo canRedirect className={styles.header__row__logo} />}
                </Col>

                {lg && !open && (
                    <Col xs={2} sm={2} lg={5}>
                        <Logo canRedirect className={styles.header__row__logo} />
                    </Col>
                )}

                {md && (
                    <Col xs={18} sm={18} lg={7}>
                        {!isVideoCategory && <SearchInput />}
                    </Col>
                )}

                {lg && (
                    <Col span={2} className="d-flex justify-content-end">
                        <LanguageDropDown userLang={userLang} />
                    </Col>
                )}

                {lg && (
                    <Col span={8} className="d-flex flex-row-reverse">
                        <Row justify="space-between" gutter={[32, 0]}>
                            <Col span={12} className="d-flex justify-content-end">
                                <Space>
                                    {social.map((item) => (
                                        <Button
                                            type="text"
                                            key={item.name}
                                            icon={item.icon}
                                            data-platform={item.name}
                                            className={styles.header__row__social}
                                            onClick={() => window?.open(item.url, '_blank')}
                                        />
                                    ))}
                                </Space>
                            </Col>

                            <Col span={12} className="d-flex justify-content-center pe-0">
                                {!currentUser?.isLoggedIn && <UserAuthSection />}

                                {currentUser?.isLoggedIn && (
                                    <UserProfileDropDown
                                        currentUser={currentUser}
                                        openDropdown={openDropdown}
                                        setOpenDropdown={setOpenDropdown}
                                        className={styles.header__row__profile}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Col>
                )}

                {!lg && (
                    <Col xs={12} sm={12} className="d-flex justify-content-end">
                        <Button ghost type="primary" icon={<BsFillGridFill />} />
                    </Col>
                )}
            </Row>
            {isVideoCategory && (
                <Row
                    align="bottom"
                    data-row-category
                    justify="space-between"
                    className={styles.header__row__categories}
                >
                    {!isEmpty(serverProps?.categories) && (
                        <Col span={24}>
                            <CategoryBar categories={serverProps?.categories} scrolled={scrolled} />
                        </Col>
                    )}
                </Row>
            )}
        </AntHeader>
    );
};

export default Header;
