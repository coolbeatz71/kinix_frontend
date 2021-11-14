import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import getSideNavWidth from '@helpers/getSideNavWidth';

import styles from './index.module.scss';
import Logo from '@components/common/Logo';
import MenuTitle from './menu-title';
import { POPULAR_SECTIONS } from '@constants/popular-section';

const { Sider } = Layout;
const { Item } = Menu;

interface ISideNavProps {
    open: boolean;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const SideNav: FC<ISideNavProps> = ({ open, collapsed, setCollapsed }) => {
    const onCollapse = (collapsed: boolean): void => {
        setCollapsed(collapsed);
    };

    const sideNavWidth = getSideNavWidth(open, collapsed);
    const menuStyles = { width: sideNavWidth };

    const menuGroupStyles = !collapsed ? { marginTop: '2rem' } : {};

    return (
        <Sider
            collapsible
            data-theme="light"
            collapsed={collapsed}
            onCollapse={onCollapse}
            className={styles.sidenav}
            collapsedWidth={sideNavWidth}
            zeroWidthTriggerStyle={{ display: 'none' }}
            data-collapsed={collapsed}
        >
            {open && (
                <>
                    <Logo canRedirect className={styles.sidenav__logo} />
                    <div style={menuGroupStyles}>
                        {!collapsed && <MenuTitle value={'Popular sections'} />}
                        <Menu style={menuStyles} defaultSelectedKeys={['1']} className={styles.sidenav__menu}>
                            {POPULAR_SECTIONS.map((item, index) => (
                                <Item className={styles.sidenav__menu__items} key={index} icon={item.icon}>
                                    {item.text}
                                </Item>
                            ))}
                        </Menu>
                    </div>
                </>
            )}
        </Sider>
    );
};

export default SideNav;
