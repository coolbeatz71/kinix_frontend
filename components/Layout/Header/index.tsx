import React, { FC, useState } from 'react';
import { Button, Col, Layout, Row, Space, Grid } from 'antd';
import getSideNavWidth from '@helpers/getSideNavWidth';
import styles from './index.module.scss';
import SearchInput from '@components/common/SearchInput';
import CustomIcon from '@components/common/CustomIcon';
import social from '@constants/social';
import useDarkLight from '@hooks/useDarkLight';
import { isDark } from '@constants/colors';
import Logo from '@components/common/Logo';

import LoginModal from '@components/Auth/Login';
import SignUpModal from '@components/Auth/SignUp';
import CategoryBar from '../CategoryBar';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

interface IHeaderProps {
    open: boolean;
    scrolled: string;
    collapsed: boolean;
    setOpen: (open: boolean) => void;
    setCollapsed: (collapsed: boolean) => void;
    setOpenSideDrawer: (openSideDrawer: boolean) => void;
    isVideoCategory: boolean;
}

const Header: FC<IHeaderProps> = ({
    open,
    collapsed,
    setOpen,
    setCollapsed,
    isVideoCategory,
    scrolled,
    setOpenSideDrawer,
}) => {
    const { value } = useDarkLight();
    const { lg } = useBreakpoint();

    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);
    const [, setOpenForgotPasswordModal] = useState<boolean>(false);

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
            style={lg ? headerStyles : undefined}
            data-is-category={isVideoCategory}
            data-sidenav-close={isSidenavClose}
        >
            <LoginModal
                open={openLoginModal}
                onCloseClick={() => setOpenLoginModal(false)}
                openSignUp={() => {
                    setOpenLoginModal(false);
                    setOpenSignUpModal(true);
                }}
                openForgotPassword={() => {
                    setOpenLoginModal(false);
                    setOpenForgotPasswordModal(true);
                }}
            />
            <SignUpModal
                open={openSignUpModal}
                onCloseClick={() => setOpenSignUpModal(false)}
                openLogin={() => {
                    setOpenSignUpModal(false);
                    setOpenLoginModal(true);
                }}
            />

            <Row align="middle" className={styles.header__row} justify="space-between">
                <Col span={1} className="p-0">
                    <Button
                        type="text"
                        size="large"
                        onClick={lg ? handleToggle : openSideDrawer}
                        icon={<CustomIcon type="hamburger-menu" className="hamburger-menu" />}
                    />
                </Col>

                {!open && (
                    <Col span={5}>
                        <Logo canRedirect className={styles.header__row__logo} />
                    </Col>
                )}

                <Col span={7}>{!isVideoCategory && <SearchInput />}</Col>

                <Col span={10} className="d-flex flex-row-reverse">
                    <Row justify="space-between" gutter={[32, 0]}>
                        <Col span={12} className="d-flex justify-content-center">
                            <Space size="middle">
                                <Button
                                    ghost
                                    onClick={() => setOpenLoginModal(true)}
                                    type={isDark(value) ? 'default' : 'primary'}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    onClick={() => setOpenSignUpModal(true)}
                                    type={isDark(value) ? 'default' : 'primary'}
                                >
                                    Sign Up
                                </Button>
                            </Space>
                        </Col>

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
                    </Row>
                </Col>
            </Row>
            {isVideoCategory && (
                <Row
                    align="bottom"
                    data-row-category
                    justify="space-between"
                    className={styles.header__row__categories}
                >
                    <Col span={24}>
                        <CategoryBar
                            categories={[
                                {
                                    id: 0,
                                    title: 'music video',
                                },
                                {
                                    id: 1,
                                    title: 'interview',
                                },
                                {
                                    id: 2,
                                    title: 'podcast',
                                },
                                {
                                    id: 3,
                                    title: 'LeFocus',
                                },
                                {
                                    id: 4,
                                    title: 'Flex&Beatz',
                                },
                            ]}
                            scrolled={scrolled}
                        />
                    </Col>
                </Row>
            )}
        </AntHeader>
    );
};

export default Header;
