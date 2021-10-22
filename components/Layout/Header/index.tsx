import React, { FC } from 'react';
import { Button, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

interface IHeaderProps {
    open: boolean;
    collapsed: boolean;
    setOpen: (open: boolean) => void;
    setCollapsed: (collapsed: boolean) => void;
}

const Header: FC<IHeaderProps> = ({ open, collapsed, setOpen, setCollapsed }) => {
    const handleToggle = (): void => {
        setCollapsed(!collapsed);
        setOpen(!open);
    };

    return (
        <AntHeader style={{ width: '100vw' }}>
            <Button type="link" size="large" onClick={handleToggle} icon={<MenuOutlined />} />
        </AntHeader>
    );
};

export default Header;
