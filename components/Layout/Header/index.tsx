import React, { FC, useState } from 'react';
import { Button, Col, Layout, Row, Space } from 'antd';
import getSideNavWidth from '@helpers/getSideNavWidth';
import styles from './index.module.scss';
import SearchInput from '@components/common/SearchInput';
import CustomIcon from '@components/common/CustomIcon';
import social from '@constants/social';
import useDarkLight from '@hooks/useDarkLight';
import { isDark } from '@constants/colors';
import Logo from '@components/common/Logo';

import LoginModal from '@components/Auth/Login';

const { Header: AntHeader } = Layout;

interface IHeaderProps {
    open: boolean;
    collapsed: boolean;
    setOpen: (open: boolean) => void;
    setCollapsed: (collapsed: boolean) => void;
}

const Header: FC<IHeaderProps> = ({ open, collapsed, setOpen, setCollapsed }) => {
    const { value } = useDarkLight();

    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

    const handleToggle = (): void => {
        if (collapsed === open) {
            setCollapsed(collapsed);
            setOpen(!open);
        } else {
            setCollapsed(!collapsed);
            setOpen(!open);
        }
    };

    const sideNavWidth = getSideNavWidth(open, collapsed);

    const headerStyles = {
        left: sideNavWidth,
        width: `calc(100% - ${sideNavWidth}px)`,
    };

    return (
        <AntHeader data-theme={value} className={styles.header} style={headerStyles}>
            <LoginModal open={openLoginModal} onCloseClick={() => setOpenLoginModal(false)} />

            <Row align="middle" className={styles.header__row} justify="space-between">
                <Col span={1} className="p-0">
                    <Button
                        type="text"
                        size="large"
                        onClick={handleToggle}
                        icon={<CustomIcon type="hamburger-menu" className="hamburger-menu" />}
                    />
                </Col>

                {!open && (
                    <Col span={5}>
                        <Logo canRedirect className={styles.header__row__logo} />
                    </Col>
                )}

                <Col span={7}>
                    <SearchInput />
                </Col>

                <Col span={10} className="d-flex flex-row-reverse">
                    <Row justify="space-between" gutter={[32, 0]}>
                        <Col span={12} className="d-flex justify-content-center">
                            <Space size="middle">
                                <Button
                                    ghost
                                    type={isDark(value) ? 'default' : 'primary'}
                                    onClick={() => setOpenLoginModal(true)}
                                >
                                    Sign In
                                </Button>
                                <Button type={isDark(value) ? 'default' : 'primary'}>Sign Up</Button>
                            </Space>
                        </Col>

                        <Col span={12} className="d-flex justify-content-end">
                            {social.map((item) => (
                                <Button
                                    type="text"
                                    key={item.name}
                                    icon={item.icon}
                                    className={styles.header__row__social}
                                    onClick={() => window?.open(item.url, '_blank')}
                                />
                            ))}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
