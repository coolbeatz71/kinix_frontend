import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { MAX_SIDENAV_WIDTH, MIN_SIDENAV_WIDTH } from 'constants/sidenav';

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

    const getCollapsedWidth = (open: boolean, collapsed: boolean): number => {
        if (open && !collapsed) return MAX_SIDENAV_WIDTH;
        if (open && collapsed) return MIN_SIDENAV_WIDTH;

        return 0;
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            zeroWidthTriggerStyle={{ display: 'none' }}
            collapsedWidth={getCollapsedWidth(open, collapsed)}
        >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Item key="1" icon={<UserOutlined />}>
                    nav 1
                </Item>
                <Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                </Item>
                <Item key="3" icon={<UploadOutlined />}>
                    nav 3
                </Item>
            </Menu>
        </Sider>
    );
};

export default SideNav;
