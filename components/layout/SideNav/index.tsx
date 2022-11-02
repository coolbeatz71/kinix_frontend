import React, { FC, useState, ReactNode, Key, Fragment } from 'react';
import Link from 'next/link';
import { HomeFilled } from 'icons';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Divider, Layout, Menu, Grid } from 'antd';
import Logo from '@components/common/Logo';
import { HOME_PATH } from '@constants/paths';
import useDarkLight from '@hooks/useDarkLight';
import { ICurrentUser } from '@interfaces/user';
import sectionList from '@constants/sidenav-section';
import getSideNavWidth from '@helpers/getSideNavWidth';

import styles from './index.module.scss';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;
const { useBreakpoint } = Grid;

interface ISideNavProps {
    open: boolean;
    collapsed: boolean;
    currentUser: ICurrentUser;
    setCollapsed: (collapsed: boolean) => void;
}

const defaultOpen = [sectionList[0].key];

const SideNav: FC<ISideNavProps> = ({ open, collapsed, setCollapsed, currentUser }) => {
    const { asPath } = useRouter();
    const { t } = useTranslation();
    const { lg } = useBreakpoint();
    const { value } = useDarkLight();
    const [openSections, setOpenSections] = useState(defaultOpen);

    const authorizedSections = currentUser?.isLoggedIn ? sectionList : [sectionList[0]];

    const onCollapse = (collapsed: boolean): void => {
        if (!collapsed) setOpenSections(defaultOpen);
        setCollapsed(collapsed);
    };

    const sideNavWidth = getSideNavWidth(open, collapsed);
    const menuStyles = { width: sideNavWidth };

    const onOpenSectionChange = (keys: Key[]): void => {
        const lastOpenKey = keys.find((key) => openSections.indexOf(key as string) === -1);
        const lastOpenSection = authorizedSections.find((section) => section.key === lastOpenKey);

        if (!lastOpenSection) setOpenSections(keys as string[]);
        else setOpenSections(lastOpenKey ? [lastOpenKey as string] : []);
    };

    const renderSections = (collapsed: boolean): ReactNode => {
        return authorizedSections.map((section) => (
            <Fragment key={section.key}>
                {collapsed ? (
                    section.sub.map((item) => {
                        const isActive = asPath === item.href;
                        return (
                            <Item
                                title={null}
                                key={item.text}
                                icon={item.icon}
                                data-active={isActive}
                                className={styles.sidenav__menu__items}
                            >
                                <Link href={item.href}>{t(item.text)}</Link>
                            </Item>
                        );
                    })
                ) : (
                    <Fragment key={section.key}>
                        <Divider className={styles.sidenav__menu_divider} />
                        <SubMenu key={section.key} title={t(section.title)} className={styles.sidenav__menu__sub}>
                            {section.sub.map((item) => {
                                const isActive = asPath === item.href;
                                return (
                                    <Item
                                        key={item.text}
                                        icon={item.icon}
                                        data-active={isActive}
                                        className={styles.sidenav__menu__items}
                                    >
                                        <Link href={item.href}>{t(item.text)}</Link>
                                    </Item>
                                );
                            })}
                        </SubMenu>
                    </Fragment>
                )}
            </Fragment>
        ));
    };

    const sideNavContent = (open: boolean): ReactNode => {
        const isActive = asPath === HOME_PATH;
        return (
            open && (
                <Fragment>
                    {lg && <Logo canRedirect className={styles.sidenav__logo} />}
                    {lg && (
                        <div className={styles.sidenav__divider}>
                            <Divider />
                        </div>
                    )}
                    <Menu
                        activeKey="0"
                        mode="inline"
                        style={menuStyles}
                        openKeys={openSections}
                        className={styles.sidenav__menu}
                        onOpenChange={onOpenSectionChange}
                    >
                        <Item
                            title={null}
                            icon={<HomeFilled />}
                            data-active={isActive}
                            className={styles.sidenav__menu__items}
                        >
                            <Link href={HOME_PATH}>{t('home')}</Link>
                        </Item>

                        {renderSections(collapsed)}
                    </Menu>
                </Fragment>
            )
        );
    };

    return (
        <Sider
            collapsible
            data-theme={value}
            collapsed={collapsed}
            onCollapse={onCollapse}
            className={styles.sidenav}
            data-collapsed={collapsed}
            collapsedWidth={sideNavWidth}
            zeroWidthTriggerStyle={{ display: 'none' }}
        >
            {sideNavContent(open)}
        </Sider>
    );
};

export default SideNav;
