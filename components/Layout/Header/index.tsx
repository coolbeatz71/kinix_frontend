import React, { FC } from 'react';
import { Button, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import getSideNavWidth from '@helpers/getSideNavWidth';

const { Header: AntHeader } = Layout;

interface IHeaderProps {
    open: boolean;
    collapsed: boolean;
    setOpen: (open: boolean) => void;
    setCollapsed: (collapsed: boolean) => void;
}

const Header: FC<IHeaderProps> = ({ open, collapsed, setOpen, setCollapsed }) => {
    const handleToggle = (): void => {
        if (collapsed === open) {
            setCollapsed(collapsed);
            setOpen(!open);
        } else {
            setCollapsed(!collapsed);
            setOpen(!open);
        }
    };

    return (
        <AntHeader
            style={{
                width: '100vw',
                position: 'fixed',
                left: getSideNavWidth(open, collapsed),
                transition: 'left .3s ease-in-out',
            }}
        >
            <Button type="link" size="large" onClick={handleToggle} icon={<MenuOutlined />} />
        </AntHeader>
    );
};

export default Header;
