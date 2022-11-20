import { FC, Fragment, useState, useEffect, useRef, Ref } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Grid from 'antd/lib/grid';
import Space from 'antd/lib/space';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import { InputRef } from 'antd/lib/input';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { MenuOutlined } from 'icons';
import { useRouter } from 'next/router';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { IoSearchCircleOutline } from 'react-icons/io5';

import Logo from '@components/common/Logo';
import useDarkLight from '@hooks/useDarkLight';
import { ICurrentUser } from '@interfaces/user';
import { IUnknownObject } from '@interfaces/app';
import { getLanguage } from '@helpers/getLanguage';
import getSideNavWidth from '@helpers/getSideNavWidth';
import SocialButtons from '@components/common/SocialButtons';
import UserAuthSection from '@components/layout/UserAuthSection';
import LanguageDropDown from '@components/layout/LanguageDropDown';
import { CategoryServerPropsType } from '@context/video-categories';
import UserMobileDropDown from '@components/layout/UserMobileDropDown';
import { ALL_ARTICLES_PATH, SEARCH_RESULTS_PATH } from '@constants/paths';
import SocialButtonDropDown from '@components/common/SocialButtonDropDown';
import NotificationDropDown from '@components/layout/NotificationDropDown';

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
    const searchInputRef = useRef<InputRef>();
    const { lg, md, sm, xs } = useBreakpoint();
    const { pathname, query, push } = useRouter();

    const isArticlePath = pathname === ALL_ARTICLES_PATH;
    const [search, setSearch] = useState<string>((query?.search as string) || '');

    const [openLargeSearch, setOpenLargeSearch] = useState(false);
    const [openSmallSearch, setOpenSmallSearch] = useState((xs || sm) && !md);

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

    useEffect(() => {
        if (openLargeSearch) {
            setTimeout(() => {
                searchInputRef?.current?.focus();
            }, 50);
        }
    }, [openLargeSearch]);

    const onOpenLargeSearchInput = (): void => {
        setOpenLargeSearch(true);
        setOpenSmallSearch(false);
    };

    const onCloseLargeSearchInput = (): void => {
        setOpenSmallSearch(true);
        setOpenLargeSearch(false);
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
        if (e.type !== 'change') onSearch({ search: '' });
    };
    const onSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const isSearchEmpty = [null, '', undefined].includes(search);
        if (e.key === 'Enter') {
            if (isSearchEmpty) setSearch('');
            else onSearch({ search });
        }
    };
    const onSearch = (data: IUnknownObject): void => {
        const query: IUnknownObject = {};

        Object.keys(data).map((key) => {
            query[key] = data[key];
        });

        push({
            pathname: SEARCH_RESULTS_PATH,
            query: { ...query, article: isArticlePath },
        });
    };

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
                <Col xs={12} sm={12} md={4} lg={1} className="p-0">
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        className="hamburger-menu"
                        onClick={lg ? handleToggle : openSideDrawer}
                    />

                    {(xs || sm) && !md && !lg && (
                        <Button
                            type="text"
                            size="large"
                            data-visible={openSmallSearch}
                            onClick={onOpenLargeSearchInput}
                            className={styles.header__row__smallSearch}
                            icon={<IoSearchCircleOutline className="anticon" />}
                        />
                    )}

                    {!xs && !sm && !md && <Logo canRedirect className={styles.header__row__logo} />}
                </Col>

                {(xs || sm) && !md && !lg && (
                    <Row
                        justify="end"
                        data-visible={openLargeSearch}
                        onBlur={onCloseLargeSearchInput}
                        className={styles.header__row__largeSearch}
                    >
                        <Col span={2} className="p-0">
                            <Button
                                danger
                                type="primary"
                                icon={<RiDeleteBack2Fill />}
                                onClick={onCloseLargeSearchInput}
                            />
                        </Col>
                        <Col span={22} className="ps-1">
                            <DynamicSearchInput
                                noButton
                                autoFocus
                                value={search}
                                onChange={onSearchChange}
                                onKeyPress={onSearchKeyPress}
                                inputRef={searchInputRef as Ref<InputRef>}
                            />
                        </Col>
                    </Row>
                )}

                {lg && !open && (
                    <Col xs={2} sm={2} md={2} lg={2} xl={3} xxl={5}>
                        <Logo canRedirect className={styles.header__row__logo} />
                    </Col>
                )}

                {md && (
                    <Col xs={18} sm={18} md={12} lg={7}>
                        {!isVideoCategory && (
                            <DynamicSearchInput
                                autoFocus
                                value={search}
                                onChange={onSearchChange}
                                onKeyPress={onSearchKeyPress}
                                onSearch={() => onSearch({ search })}
                            />
                        )}
                    </Col>
                )}

                {!xs && !sm && md && !lg && (
                    <Fragment>
                        <Col className="d-flex justify-content-end">
                            <LanguageDropDown userLang={userLang} />
                        </Col>

                        <Col className="d-flex justify-content-end">
                            <SocialButtonDropDown />
                        </Col>
                    </Fragment>
                )}

                {lg && (
                    <Col span={11} className="d-flex flex-row-reverse">
                        <Row justify="space-between" gutter={[32, 0]}>
                            <Fragment>
                                <Col span={4} className="d-flex justify-content-end">
                                    <LanguageDropDown userLang={userLang} />
                                </Col>
                                <Col span={10} className="d-flex justify-content-end">
                                    <SocialButtons className={styles.header__row__social} />
                                </Col>
                            </Fragment>

                            <Col span={10} className="d-flex justify-content-end ps-0">
                                {!currentUser?.isLoggedIn && <UserAuthSection />}

                                {currentUser?.isLoggedIn && (
                                    <DynamicUserProfileDropDown
                                        currentUser={currentUser}
                                        className={styles.header__row__profile}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Col>
                )}

                {!lg && (
                    <Col xs={12} sm={12} md={4} className="d-flex justify-content-end">
                        <Space size="middle">
                            <SocialButtonDropDown />
                            <LanguageDropDown userLang={userLang} />
                            {currentUser?.isLoggedIn && <NotificationDropDown />}
                            <UserMobileDropDown currentUser={currentUser} />
                        </Space>
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
