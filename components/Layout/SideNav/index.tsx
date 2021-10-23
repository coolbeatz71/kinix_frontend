import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import getSideNavWidth from '@helpers/getSideNavWidth';

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

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            zeroWidthTriggerStyle={{ display: 'none' }}
            collapsedWidth={getSideNavWidth(open, collapsed)}
        >
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ position: 'fixed', width: getSideNavWidth(open, collapsed) }}
            >
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
