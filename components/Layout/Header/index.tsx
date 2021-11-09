import React, { FC } from 'react';
import { Button, Col, Layout, Row } from 'antd';
import getSideNavWidth from '@helpers/getSideNavWidth';
import styles from './index.module.scss';
import SearchInput from '@components/common/SearchInput';
import CustomIcon from '@components/common/CustomIcon';
import social from '@constants/social';

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

    const authBtnStyles = { marginLeft: 20 };

    return (
        <AntHeader data-theme="light" className={styles.header} style={headerStyles}>
            <Row align="middle" className={styles.header__row}>
                <Col flex={1}>
                    <Button
                        type="text"
                        size="large"
                        onClick={handleToggle}
                        icon={<CustomIcon type="hamburger-menu" className="hamburger-menu" />}
                    />
                </Col>

                <Col flex={2}>
                    <SearchInput />
                </Col>

                <Col flex={2} className={styles.header__row__auth}>
                    <Button style={authBtnStyles} type="primary" ghost>
                        Sign In
                    </Button>
                    <Button style={authBtnStyles} type="primary">
                        Sign Up
                    </Button>
                </Col>

                <Col flex={2}>
                    {social.map((item) => (
                        <Button
                            type="text"
                            size="large"
                            key={item.name}
                            icon={item.icon}
                            className={styles.header__row__social}
                            onClick={() => window?.open(item.url, '_blank')}
                        />
                    ))}
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
