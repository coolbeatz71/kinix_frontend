import React, { FC, ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import toLower from 'lodash/toLower';
import upperFirst from 'lodash/upperFirst';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Layout as AntLayout, Grid } from 'antd';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import Header from '@components/layout/Header';
import getImageUrl from '@helpers/getImageUrl';
import useDarkLight from '@hooks/useDarkLight';
import { ICurrentUser } from '@interfaces/user';
import { PRIMARY, WARNING } from '@constants/styles';
import getPlatformUrl from '@helpers/getPlatformUrl';
import StoryModal from '@components/modal/StoryModal';
import getLocalUserData from '@helpers/getLocalUserData';
import CategoriesContext from '@context/video-categories';
import getCurrentUserAction from 'redux/user/getCurrentUser';
import { APP_AUTHOR, APP_NAME, APP_TWITTER_HANDLE } from '@constants/platform';

const DynamicFooter = dynamic(() => import('./Footer'));
const DynamicSideNav = dynamic(() => import('./SideNav'));
const DynamicSideDrawer = dynamic(() => import('./SideDrawer'));
const DynamicDarkModeToggler = dynamic(() => import('@components/common/DarkModeToggler'));

import styles from './index.module.scss';

const { Content } = AntLayout;
const { useBreakpoint } = Grid;

interface ILayoutProps {
    title?: string;
    baseUrl?: string;
    isHome?: boolean;
    isArticle?: boolean;
    description?: string;
    showFooter?: boolean;
    showHeader?: boolean;
    image?: string | null;
    children: ReactElement;
    isVideoCategory?: boolean;
}

const Layout: FC<ILayoutProps> = ({
    title,
    image,
    children,
    description,
    baseUrl: _baseUrl,
    showHeader = true,
    showFooter = true,
    isArticle = false,
    isHome: _isHome = false,
    isVideoCategory = false,
}) => {
    const router = useRouter();
    const { lg } = useBreakpoint();
    const { t } = useTranslation();
    const { value } = useDarkLight();

    const dispatch = useAppDispatch();
    const userLocalData = getLocalUserData();
    const { data: userData } = useSelector(({ user }: IRootState) => user?.currentUser);

    const [openSidenav, setOpenSidenav] = useState<boolean>(false);
    const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);
    const [collapsedSidenav, setCollapsedSidenav] = useState<boolean>(true);

    const { serverProps } = useContext(CategoriesContext);

    const [scrolled, setScrolled] = useState<string>('');

    const scrollHandler = useCallback(() => {
        setScrolled(window.pageYOffset > 640 ? 'over' : window.pageYOffset > 80 ? 'scrolled' : '');
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [scrollHandler]);

    useEffect(() => {
        if (isEmpty(userData) || isEmpty(userLocalData)) dispatch(getCurrentUserAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const _title = upperFirst(toLower(title)) || '';
    const _url = `${getPlatformUrl()}${router.asPath}`;
    const _description = description || t('app_description');
    const _image = image || `${getPlatformUrl()}/download.png`;

    const isSidenavClose = !openSidenav || collapsedSidenav;

    return (
        <AntLayout className={styles.layout} data-theme={value}>
            <Head>
                <title>
                    {title ? `${_title} | ` : ''}
                    {APP_NAME}
                </title>
                <link rel="canonical" href={_url} />
                <meta name="description" content={_description} />
                <meta property="og:type" content="website" key="og:type" />
                <meta property="og:site_name" content={APP_NAME} key="og:sitename" />
                <meta property="og:title" content={_title} key="og:title" />
                <meta property="og:image" content={_image} key="og:image" />
                <meta property="og:description" content={_description} key="og:desc" />
                <meta property="og:url" content={_url} key="og:url" />

                {!isArticle && <meta name="twitter:site" content={APP_TWITTER_HANDLE} />}

                <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
                <meta name="twitter:title" content={_title} key="twitter:title" />
                <meta name="twitter:description" content={_description} key="twitter:desc" />
                <meta name="twitter:image" content={_image} key="twitter:image" />
                <meta name="author" content={APP_AUTHOR} />
                <meta name="theme-color" content={WARNING} />
                <link href="/robots.txt" />
                <link rel="preconnect" href={getImageUrl()} />

                <link rel="manifest" href="/site.webmanifest" />
                <link rel="apple-touch-icon" href="icons/apple-icon.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color={PRIMARY} />
                <meta name="msapplication-TileColor" content={WARNING} />
            </Head>

            <StoryModal />

            {lg && <DynamicDarkModeToggler />}

            {lg ? (
                <DynamicSideNav
                    open={openSidenav}
                    collapsed={collapsedSidenav}
                    setCollapsed={setCollapsedSidenav}
                    currentUser={(userLocalData || userData) as ICurrentUser}
                />
            ) : (
                <DynamicSideDrawer
                    open={openSideDrawer}
                    setOpen={setOpenSideDrawer}
                    currentUser={(userLocalData || userData) as ICurrentUser}
                />
            )}

            <div className={styles.layout__main} data-show-header={showHeader}>
                {showHeader && (
                    <Header
                        open={openSidenav}
                        scrolled={scrolled}
                        setOpen={setOpenSidenav}
                        serverProps={serverProps}
                        collapsed={collapsedSidenav}
                        isVideoCategory={isVideoCategory}
                        setCollapsed={setCollapsedSidenav}
                        setOpenSideDrawer={setOpenSideDrawer}
                        currentUser={(userLocalData || userData) as ICurrentUser}
                    />
                )}

                <Content className={styles.layout__main__content} data-sidenav-close={isSidenavClose}>
                    {children}
                </Content>
                {showFooter && <DynamicFooter isSidenavClose={isSidenavClose} />}
            </div>
        </AntLayout>
    );
};

export default Layout;
