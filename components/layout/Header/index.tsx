import React, { FC, useState } from 'react';
import { Button, Col, Layout, Row, Grid } from 'antd';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { BsFillGridFill } from 'react-icons/bs';
import { MenuOutlined } from 'icons';
import Logo from '@components/common/Logo';
import useDarkLight from '@hooks/useDarkLight';
import { ICurrentUser } from '@interfaces/user';
import { getLanguage } from '@helpers/getLanguage';
import getSideNavWidth from '@helpers/getSideNavWidth';
import SocialButtons from '@components/common/SocialButtons';
import UserAuthSection from '@components/layout/UserAuthSection';
import LanguageDropDown from '@components/layout/LanguageDropDown';
import { CategoryServerPropsType } from '@context/video-categories';

const DynamicLoginModal = dynamic(() => import('@components/auth/Login'));
const DynamicSignUpModal = dynamic(() => import('@components/auth/SignUp'));
const DynamicCategoryBar = dynamic(() => import('@components/layout/CategoryBar'));
const DynamicSearchInput = dynamic(() => import('@components/common/SearchInput'));
const DynamicResetPasswordModal = dynamic(() => import('@components/auth/ResetPassword'));
const DynamicForgotPasswordModal = dynamic(() => import('@components/auth/ForgotPassword'));
const DynamicUserProfileDropDown = dynamic(() => import('@components/layout/UserProfileDropDown'));

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
            <DynamicLoginModal />
            <DynamicSignUpModal />
            <DynamicResetPasswordModal />
            <DynamicForgotPasswordModal />

            <Row align="middle" className={styles.header__row} justify="space-between">
                <Col xs={12} sm={12} lg={1} className="p-0">
                    <Button
                        type="text"
                        size="large"
                        icon={<MenuOutlined />}
                        className="hamburger-menu"
                        onClick={lg ? handleToggle : openSideDrawer}
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
                        {!isVideoCategory && <DynamicSearchInput />}
                    </Col>
                )}

                {lg && (
                    <Col span={10} className="d-flex flex-row-reverse">
                        <Row justify="space-between" gutter={[32, 0]}>
                            <Col span={4} className="d-flex justify-content-end">
                                <LanguageDropDown userLang={userLang} />
                            </Col>
                            <Col span={10} className="d-flex justify-content-end">
                                <SocialButtons className={styles.header__row__social} />
                            </Col>

                            <Col span={10} className="d-flex justify-content-end ps-0">
                                {!currentUser?.isLoggedIn && <UserAuthSection />}

                                {currentUser?.isLoggedIn && (
                                    <DynamicUserProfileDropDown
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
                            <DynamicCategoryBar categories={serverProps?.categories} scrolled={scrolled} />
                        </Col>
                    )}
                </Row>
            )}
        </AntHeader>
    );
};

export default Header;
