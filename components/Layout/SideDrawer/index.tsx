import React, { FC, useState, ReactNode, Key, Fragment } from 'react';
import { Menu, Drawer, Divider, Row, Col, Button, Space } from 'antd';

import { DISCOVER_PATH, HOME_PATH } from '@constants/paths';
import sectionList from '@constants/sidenav-section';
import { BulbFilled, HomeFilled } from '@ant-design/icons';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';

import Link from 'next/link';
import useDarkLight from '@hooks/useDarkLight';
import Logo from '@components/common/Logo';
import CustomIcon from '@components/common/CustomIcon';
import UserAvatar from '@components/common/Profile/UserAvatar';

import styles from './index.module.scss';

const { Item, SubMenu } = Menu;
interface ISideDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const defaultOpen = [sectionList[0].key];

const SideDrawer: FC<ISideDrawerProps> = ({ open, setOpen }) => {
    const { value, toggle } = useDarkLight();

    const [openSections, setOpenSections] = useState(defaultOpen);

    const handleCloseDrawer = (): void => setOpen(false);

    const onOpenSectionChange = (keys: Key[]): void => {
        const lastOpenKey = keys.find((key) => openSections.indexOf(key as string) === -1);
        const lastOpenSection = sectionList.find((section) => section.key === lastOpenKey);

        if (!lastOpenSection) setOpenSections(keys as string[]);
        else setOpenSections(lastOpenKey ? [lastOpenKey as string] : []);
    };

    const renderSections = (): ReactNode => {
        return sectionList.map((section) => (
            <Fragment key={section.key}>
                <Divider className={styles.sidedrawer__menu_divider} />
                <SubMenu key={section.key} title={section.title} className={styles.sidedrawer__menu__sub}>
                    {section.sub.map((item) => (
                        <Item
                            className={styles.sidedrawer__menu__sub__items}
                            key={item.text}
                            icon={item.icon}
                            onClick={handleCloseDrawer}
                        >
                            <Link href={item.href}>{item.text}</Link>
                        </Item>
                    ))}
                </SubMenu>
            </Fragment>
        ));
    };

    const renderHeader = (): ReactNode => {
        return (
            <div className={styles.sidedrawer__header}>
                <Row justify="space-between" align="middle">
                    <Col span={16}>
                        <Logo canRedirect className={styles.sidedrawer__header__logo} />
                    </Col>

                    <Col span={8} className="d-flex justify-content-end">
                        <Space size={12}>
                            <Button
                                type="text"
                                size="large"
                                onClick={toggle}
                                className={styles.sidedrawer__header__themeToggle}
                                icon={value === 'dark' ? <BsFillSunFill /> : <BsMoonStarsFill />}
                            />
                            <Button
                                type="text"
                                size="large"
                                icon={<CustomIcon type="hamburger-menu" className="hamburger-menu" />}
                                onClick={handleCloseDrawer}
                            />
                        </Space>
                    </Col>
                </Row>

                <Divider className={styles.sidedrawer__header__divider} />
            </div>
        );
    };

    return (
        <Drawer
            destroyOnClose
            visible={open}
            closable={false}
            placement="left"
            data-theme={value}
            className={styles.sidedrawer}
            onClose={handleCloseDrawer}
            footer={<UserAvatar onClick={handleCloseDrawer} userName="Mutombo Jean-vincent" />}
        >
            <Menu
                mode="inline"
                openKeys={openSections}
                onOpenChange={onOpenSectionChange}
                className={styles.sidedrawer__menu}
            >
                {renderHeader()}
                <Item
                    title={null}
                    onClick={handleCloseDrawer}
                    className={styles.sidedrawer__menu__items}
                    icon={<HomeFilled />}
                >
                    <Link href={HOME_PATH}>Home</Link>
                </Item>
                <Item
                    title={null}
                    onClick={handleCloseDrawer}
                    className={styles.sidedrawer__menu__items}
                    icon={<BulbFilled />}
                >
                    <Link href={DISCOVER_PATH}>Discover</Link>
                </Item>

                {renderSections()}
            </Menu>
        </Drawer>
    );
};

export default SideDrawer;
