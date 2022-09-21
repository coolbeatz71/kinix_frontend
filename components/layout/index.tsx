import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Layout as AntLayout, Grid } from 'antd';
import getPlatformUrl from '@helpers/getPlatformUrl';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import getImageUrl from '@helpers/getImageUrl';
import SideNav from './SideNav';
import SideDrawer from './SideDrawer';
import Header from './Header';
import DarkModeToggler from '@components/common/DarkModeToggler';
import useDarkLight from '@hooks/useDarkLight';
import { PRIMARY, WARNING } from '@constants/colors';
import { APP_AUTHOR, APP_NAME, APP_TWITTER_HANDLE } from '@constants/platform';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import { IRootState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/store';
import getCurrentUserAction from 'redux/user/getCurrentUser';
import { ICurrentUser } from '@interfaces/user';
import getLocalUserData from '@helpers/getLocalUserData';

import styles from './index.module.scss';

const { Content } = AntLayout;
const { useBreakpoint } = Grid;

interface ILayoutProps {
    children: ReactElement;
    isHome?: boolean;
    showFooter?: boolean;
    showHeader?: boolean;
    isArticle?: boolean;
    isVideoCategory?: boolean;
    title?: string;
    image?: string;
    description?: string;
    baseUrl?: string;
}

const Layout: FC<ILayoutProps> = ({
    baseUrl: _baseUrl,
    title,
    image,
    description,
    showHeader = true,
    isHome: _isHome = false,
    showFooter = true,
    isArticle = false,
    isVideoCategory = false,
    children,
}) => {
    const router = useRouter();
    const { value } = useDarkLight();
    const { lg } = useBreakpoint();
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const userLocalData = getLocalUserData();
    const { data: userData } = useSelector(({ user }: IRootState) => user?.currentUser);

    const [openSidenav, setOpenSidenav] = useState<boolean>(false);
    const [openSideDrawer, setOpenSideDrawer] = useState<boolean>(false);
    const [collapsedSidenav, setCollapsedSidenav] = useState<boolean>(true);

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

    const _url = `${getPlatformUrl()}${router.asPath}`;
    const _description = description || t('app_description');
    const _image = image ? `${getImageUrl()}/${image}` : `${getPlatformUrl()}/download.png`;
    const _title = title || '';

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

            {lg && <DarkModeToggler />}

            {lg ? (
                <SideNav open={openSidenav} collapsed={collapsedSidenav} setCollapsed={setCollapsedSidenav} />
            ) : (
                <SideDrawer open={openSideDrawer} setOpen={setOpenSideDrawer} />
            )}

            <div className={styles.layout__main} data-show-header={showHeader}>
                {showHeader && (
                    <Header
                        scrolled={scrolled}
                        open={openSidenav}
                        setOpen={setOpenSidenav}
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

                {showFooter && <Footer isSidenavClose={isSidenavClose} />}
            </div>
        </AntLayout>
    );
};

export default Layout;
