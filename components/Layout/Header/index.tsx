import React, { FC } from 'react';
import { Button, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import getSideNavWidth from '@helpers/getSideNavWidth';
import styles from './index.module.scss';

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

    const headerStyles = {
        left: getSideNavWidth(open, collapsed),
    };

    return (
        <AntHeader hasSider className={styles.header} style={headerStyles}>
            <Button type="link" size="large" onClick={handleToggle} icon={<MenuOutlined />} />
        </AntHeader>
    );
};

export default Header;
