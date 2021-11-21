import React, { FC } from 'react';
import { Button, Col, Layout, Row, Space } from 'antd';
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

    const sideNavWidth = getSideNavWidth(open, collapsed);

    const headerStyles = {
        left: sideNavWidth,
        width: `calc(100% - ${sideNavWidth}px)`,
    };

    return (
        <AntHeader data-theme="light" className={styles.header} style={headerStyles}>
            <Row align="middle" className={styles.header__row} justify="space-between" gutter={24}>
                <Col span={6} className="p-0">
                    <Button
                        type="text"
                        onClick={handleToggle}
                        icon={<CustomIcon type="hamburger-menu" className="hamburger-menu" />}
                    />
                </Col>

                <Col span={8}>
                    <SearchInput />
                </Col>

                <Col span={10} className="d-flex flex-row-reverse">
                    <Row justify="space-between" gutter={[24, 0]}>
                        <Col span={12}>
                            <Space size="middle">
                                <Button type="primary" ghost>
                                    Sign In
                                </Button>
                                <Button type="primary">Sign Up</Button>
                            </Space>
                        </Col>

                        <Col span={12}>
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
