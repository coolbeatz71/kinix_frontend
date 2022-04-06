import React, { FC, useState, ReactNode, Key, Fragment } from 'react';
import { Menu, Drawer, Divider, Row, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { DISCOVER_PATH, HOME_PATH } from '@constants/paths';
import styles from './index.module.scss';
import sectionList from '@constants/sidenav-section';
import { BulbFilled, HomeFilled } from '@ant-design/icons';
import Link from 'next/link';
import useDarkLight from '@hooks/useDarkLight';
import Logo from '@components/common/Logo';

const { Item, SubMenu } = Menu;

interface ISideDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const defaultOpen = [sectionList[0].key];

const SideDrawer: FC<ISideDrawerProps> = ({ open, setOpen }) => {
    const { value } = useDarkLight();

    const [openSections, setOpenSections] = useState(defaultOpen);

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
                        <Item className={styles.sidedrawer__menu__sub__items} key={item.text} icon={item.icon}>
                            <Link href={item.href}>{item.text}</Link>
                        </Item>
                    ))}
                </SubMenu>
            </Fragment>
        ));
    };

    return (
        <Drawer visible={open} placement="left" data-theme={value} closable={false} className={styles.sidedrawer}>
            <Menu
                mode="inline"
                openKeys={openSections}
                onOpenChange={onOpenSectionChange}
                className={styles.sidedrawer__menu}
            >
                <div className={styles.sidedrawer__header}>
                    <Row justify="space-between" align="middle">
                        <Col span={16}>
                            <Logo canRedirect className={styles.sidedrawer__header__logo} />
                        </Col>
                        <Col span={8} className="d-flex justify-content-end">
                            <Button
                                type="text"
                                size="large"
                                icon={<MenuOutlined />}
                                onClick={() => setOpen(false)}
                                className={styles.sidedrawer__header__closeBtn}
                            />
                        </Col>
                    </Row>

                    <Divider className={styles.sidedrawer__header__divider} />
                </div>

                <Item title={null} className={styles.sidedrawer__menu__items} icon={<HomeFilled />}>
                    <Link href={HOME_PATH}>Home</Link>
                </Item>
                <Item title={null} className={styles.sidedrawer__menu__items} icon={<BulbFilled />}>
                    <Link href={DISCOVER_PATH}>Discover</Link>
                </Item>

                {renderSections()}
            </Menu>
        </Drawer>
    );
};

export default SideDrawer;
