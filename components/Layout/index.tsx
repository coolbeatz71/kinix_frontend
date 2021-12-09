import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { Layout as AntLayout } from 'antd';
import getPlatformUrl from '@helpers/getPlatformUrl';
import { useRouter } from 'next/router';
import getImageUrl from '@helpers/getImageUrl';
import Head from 'next/head';
import styles from './index.module.scss';
import SideNav from './SideNav';
import Header from './Header';
import DarkModeToggler from '@components/common/DarkModeToggler';
import useDarkLight from '@hooks/useDarkLight';
import { PRIMARY, WARNING } from '@constants/colors';

const { Footer, Content } = AntLayout;
interface ILayoutProps {
    children: ReactElement;
    isHome?: boolean;
    showFooter?: boolean;
    showHeader?: boolean;
    isArticle?: boolean;
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
    isHome: _isHome = false,
    showHeader: _showHeader = false,
    showFooter = false,
    isArticle = false,
    children,
}) => {
    const router = useRouter();
    const { value } = useDarkLight();

    const [open, setOpen] = useState<boolean>(true);
    const [collapsedSidenav, setCollapsedSidenav] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_scrolled, setScrolled] = useState<string>('');

    const scrollHandler = useCallback(() => {
        setScrolled(window.pageYOffset > 640 ? 'over' : window.pageYOffset > 80 ? 'scrolled' : '');
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [scrollHandler]);

    const _url = `${getPlatformUrl()}${router.asPath}`;
    const _description = description || 'When words stop coming out, music pops up';
    const _siteName = 'Kiinox';
    const _author = 'Kiinox LTD';
    const _image = image ? `${getImageUrl()}/${image}` : `${getPlatformUrl()}/download.png`;
    const _title = title || '';
    const _twitterHandle = '@KiinoxHQ';

    return (
        <AntLayout className={styles.layout} data-theme={value}>
            <Head>
                <title>
                    {title ? `${_title} | ` : ''}
                    {_siteName}
                </title>
                <link rel="canonical" href={_url} />
                <meta name="description" content={_description} />
                <meta property="og:type" content="website" key="og:type" />
                <meta property="og:site_name" content={_siteName} key="og:sitename" />
                <meta property="og:title" content={_title} key="og:title" />
                <meta property="og:image" content={_image} key="og:image" />
                <meta property="og:description" content={_description} key="og:desc" />
                <meta property="og:url" content={_url} key="og:url" />

                {!isArticle && <meta name="twitter:site" content={_twitterHandle} />}

                <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
                <meta name="twitter:title" content={_title} key="twitter:title" />
                <meta name="twitter:description" content={_description} key="twitter:desc" />
                <meta name="twitter:image" content={_image} key="twitter:image" />
                <meta name="author" content={_author} />
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

            <DarkModeToggler />

            <SideNav open={open} collapsed={collapsedSidenav} setCollapsed={setCollapsedSidenav} />
            <div className={styles.layout__main}>
                <Header open={open} setOpen={setOpen} collapsed={collapsedSidenav} setCollapsed={setCollapsedSidenav} />
                <Content className={styles.layout__main__content}>{children}</Content>
                {showFooter && <Footer className={styles.layout__footer}>footer</Footer>}
            </div>
        </AntLayout>
    );
};

export default Layout;
