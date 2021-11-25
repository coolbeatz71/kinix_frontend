import React, { FC, useState, ReactNode, Key, Fragment } from 'react';
import { Divider, Layout, Menu } from 'antd';
import getSideNavWidth from '@helpers/getSideNavWidth';

import { DISCOVER_PATH, HOME_PATH } from '@constants/paths';
import styles from './index.module.scss';
import Logo from '@components/common/Logo';
import sectionList from '@constants/sidenav-section';
import { BulbFilled, HomeFilled } from '@ant-design/icons';
import Link from 'next/link';
import useDarkLight from '@hooks/useDarkLight';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

interface ISideNavProps {
    open: boolean;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const defaultOpen = [sectionList[0].key];

const SideNav: FC<ISideNavProps> = ({ open, collapsed, setCollapsed }) => {
    const { value } = useDarkLight();

    const [openSections, setOpenSections] = useState(defaultOpen);

    const onCollapse = (collapsed: boolean): void => {
        if (!collapsed) setOpenSections(defaultOpen);
        setCollapsed(collapsed);
    };

    const sideNavWidth = getSideNavWidth(open, collapsed);
    const menuStyles = { width: sideNavWidth };

    const onOpenSectionChange = (keys: Key[]): void => {
        const lastOpenKey = keys.find((key) => openSections.indexOf(key as string) === -1);
        const lastOpenSection = sectionList.find((section) => section.key === lastOpenKey);

        if (!lastOpenSection) setOpenSections(keys as string[]);
        else setOpenSections(lastOpenKey ? [lastOpenKey as string] : []);
    };

    const renderSections = (): ReactNode => {
        return sectionList.map((section) => (
            <Fragment key={section.key}>
                {collapsed ? (
                    section.sub.map((item) => (
                        <Item title={null} className={styles.sidenav__menu__items} key={item.text} icon={item.icon}>
                            {item.text}
                        </Item>
                    ))
                ) : (
                    <Fragment key={section.key}>
                        <Divider className={styles.sidenav__menu_divider} />
                        <SubMenu key={section.key} title={section.title} className={styles.sidenav__menu__sub}>
                            {section.sub.map((item) => (
                                <Item className={styles.sidenav__menu__items} key={item.text} icon={item.icon}>
                                    {item.text}
                                </Item>
                            ))}
                        </SubMenu>
                    </Fragment>
                )}
            </Fragment>
        ));
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
            {open && (
                <>
                    <Logo canRedirect className={styles.sidenav__logo} />
                    <div className={styles.sidenav__divider}>
                        <Divider />
                    </div>
                    <Menu
                        mode="inline"
                        style={menuStyles}
                        openKeys={openSections}
                        onOpenChange={onOpenSectionChange}
                        className={styles.sidenav__menu}
                    >
                        <Item title={null} className={styles.sidenav__menu__items} icon={<HomeFilled />}>
                            <Link href={HOME_PATH}>Home</Link>
                        </Item>
                        <Item title={null} className={styles.sidenav__menu__items} icon={<BulbFilled />}>
                            <Link href={DISCOVER_PATH}>Discover</Link>
                        </Item>

                        {renderSections()}
                    </Menu>
                </>
            )}
        </Sider>
    );
};

export default SideNav;
