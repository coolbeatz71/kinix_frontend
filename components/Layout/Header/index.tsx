import React, { FC } from 'react';
import { Button, Col, Layout, Row, Space, Grid, Dropdown, Menu, Avatar, Badge } from 'antd';
import getSideNavWidth from '@helpers/getSideNavWidth';
import SearchInput from '@components/common/SearchInput';
import { MenuOutlined, BellFilled, UserOutlined } from '@ant-design/icons';
import social from '@constants/social';
import useDarkLight from '@hooks/useDarkLight';
import { isDark } from '@constants/colors';
import Logo from '@components/common/Logo';

import LoginModal from '@components/Auth/Login';
import SignUpModal from '@components/Auth/SignUp';
import CategoryBar from '../CategoryBar';
import { BsFillGridFill } from 'react-icons/bs';

import styles from './index.module.scss';
import { showAuthDialogAction } from 'redux/auth/showDialog';
import { EnumAuthContext } from '@constants/auth-context';
import { useDispatch } from 'react-redux';
import { languageList } from '../../../constants/language';
import CustomIcon from '@components/common/CustomIcon';
import { upperFirst, truncate } from 'lodash';
import { ICurrentUser } from '@interfaces/user';

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;
const { Item } = Menu;

interface IHeaderProps {
    open: boolean;
    scrolled: string;
    collapsed: boolean;
    isVideoCategory: boolean;
    currentUser: ICurrentUser;
    setOpen: (open: boolean) => void;
    setCollapsed: (collapsed: boolean) => void;
    setOpenSideDrawer: (openSideDrawer: boolean) => void;
}

const userName = 'mutombo jean-vincent';

const Header: FC<IHeaderProps> = ({
    open,
    setOpen,
    scrolled,
    collapsed,
    currentUser,
    setCollapsed,
    isVideoCategory,
    setOpenSideDrawer,
}) => {
    const { value } = useDarkLight();
    const { lg, md } = useBreakpoint();

    const dispatch = useDispatch();

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

    const updateLanguage = (lang: string): void => {
        console.log(lang);
    };

    const LanguageMenu = (
        <Menu className={styles.header__row__language__menu}>
            {languageList.map((lang) => (
                <Item
                    key={lang}
                    onClick={() => {
                        updateLanguage(lang);
                    }}
                >
                    <CustomIcon type={`${lang}-flag`} /> {upperFirst(lang)}
                </Item>
            ))}
        </Menu>
    );

    const UserProfileMenu = (
        <Menu>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis enim, suscipit culpa deserunt similique
            adipisci ducimus quisquam expedita, quod temporibus doloremque cupiditate optio vero porro dolorem
            voluptatem omnis, quis nulla.
        </Menu>
    );

    const formattedUserName = (name: string): string =>
        upperFirst(
            truncate(name, {
                length: 10,
            }),
        );

    return (
        <AntHeader
            data-theme={value}
            data-scroll={scrolled}
            className={styles.header}
            style={lg ? headerStyles : undefined}
            data-is-category={isVideoCategory}
            data-sidenav-close={isSidenavClose}
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
                        <Dropdown
                            overlay={LanguageMenu}
                            placement="bottomLeft"
                            className={styles.header__row__language}
                        >
                            <Button
                                ghost
                                icon={<CustomIcon type={`english-flag`} />}
                                type={isDark(value) ? 'default' : 'primary'}
                            >
                                <span data-lang>EN</span>
                            </Button>
                        </Dropdown>
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

                            <Col span={12} className="d-flex justify-content-center">
                                {!currentUser?.isLoggedIn && (
                                    <Space size="middle">
                                        <Button
                                            ghost
                                            type={isDark(value) ? 'default' : 'primary'}
                                            onClick={() =>
                                                showAuthDialogAction({ isOpen: true, context: EnumAuthContext.LOGIN })(
                                                    dispatch,
                                                )
                                            }
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            type={isDark(value) ? 'default' : 'primary'}
                                            onClick={() =>
                                                showAuthDialogAction({ isOpen: true, context: EnumAuthContext.SIGNUP })(
                                                    dispatch,
                                                )
                                            }
                                        >
                                            Sign Up
                                        </Button>
                                    </Space>
                                )}

                                {currentUser?.isLoggedIn && (
                                    <Space size="middle">
                                        <Button
                                            type="text"
                                            shape="circle"
                                            icon={
                                                <Badge count={1}>
                                                    <BellFilled />
                                                </Badge>
                                            }
                                        />
                                        <Dropdown
                                            overlay={UserProfileMenu}
                                            placement="bottomLeft"
                                            className={styles.header__row__profile}
                                        >
                                            <Button
                                                type="text"
                                                icon={
                                                    <Avatar
                                                        size="small"
                                                        icon={<UserOutlined />}
                                                        style={{ backgroundColor: '#87d068' }}
                                                    />
                                                }
                                            >
                                                {formattedUserName(userName)}
                                            </Button>
                                        </Dropdown>
                                    </Space>
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
