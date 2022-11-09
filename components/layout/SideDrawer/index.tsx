import { FC, useState, ReactNode, Key, Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { HomeFilled, MenuOutlined } from 'icons';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Space from 'antd/lib/space';
import Drawer from 'antd/lib/drawer';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';

import { HOME_PATH } from '@constants/paths';
import useDarkLight from '@hooks/useDarkLight';
import { ICurrentUser } from '@interfaces/user';
import sectionList from '@constants/sidenav-section';

const DynamicLogo = dynamic(() => import('@components/common/Logo'));
const DynamicUserAvatar = dynamic(() => import('@components/common/UserAvatar'));

import styles from './index.module.scss';

const { Item, SubMenu } = Menu;
interface ISideDrawerProps {
    open: boolean;
    currentUser: ICurrentUser;
    setOpen: (open: boolean) => void;
}

const defaultOpen = [sectionList[0].key];

const SideDrawer: FC<ISideDrawerProps> = ({ open, setOpen, currentUser }) => {
    const { asPath } = useRouter();
    const { t } = useTranslation();
    const { value, toggle, isDark } = useDarkLight();
    const [openSections, setOpenSections] = useState(defaultOpen);

    const authorizedSections = currentUser?.isLoggedIn ? sectionList : [sectionList[0]];

    const handleCloseDrawer = (): void => setOpen(false);

    const onOpenSectionChange = (keys: Key[]): void => {
        const lastOpenKey = keys.find((key) => openSections.indexOf(key as string) === -1);
        const lastOpenSection = authorizedSections.find((section) => section.key === lastOpenKey);

        if (!lastOpenSection) setOpenSections(keys as string[]);
        else setOpenSections(lastOpenKey ? [lastOpenKey as string] : []);
    };

    const renderSections = (): ReactNode => {
        return authorizedSections.map((section) => (
            <Fragment key={section.key}>
                <Divider className={styles.sidedrawer__menu_divider} />
                <SubMenu key={section.key} title={t(section.title)} className={styles.sidedrawer__menu__sub}>
                    {section.sub.map((item) => {
                        const isActive = asPath === item.href;
                        return (
                            <Item
                                key={item.text}
                                icon={item.icon}
                                data-active={isActive}
                                onClick={handleCloseDrawer}
                                className={styles.sidedrawer__menu__sub__items}
                            >
                                <Link href={item.href}>{t(item.text)}</Link>
                            </Item>
                        );
                    })}
                </SubMenu>
            </Fragment>
        ));
    };

    const renderHeader = (): ReactNode => (
        <div className={styles.sidedrawer__header}>
            <Row justify="space-between" align="middle">
                <Col span={16}>
                    <DynamicLogo canRedirect className={styles.sidedrawer__header__logo} />
                </Col>

                <Col span={8} className="d-flex justify-content-end">
                    <Space size={12}>
                        <Button
                            size="large"
                            type="primary"
                            onClick={toggle}
                            className={styles.sidedrawer__header__themeToggle}
                            icon={value === 'dark' ? <BsFillSunFill /> : <BsMoonStarsFill />}
                        />
                        <Button
                            ghost
                            size="large"
                            icon={<MenuOutlined />}
                            className="hamburger-menu"
                            onClick={handleCloseDrawer}
                            type={isDark ? 'default' : 'primary'}
                        />
                    </Space>
                </Col>
            </Row>

            <Divider className={styles.sidedrawer__header__divider} />
        </div>
    );

    const sideMenuContent = (): ReactNode => {
        const isActive = asPath === HOME_PATH;
        return (
            <Menu
                mode="inline"
                openKeys={openSections}
                onOpenChange={onOpenSectionChange}
                className={styles.sidedrawer__menu}
            >
                {renderHeader()}
                <Item
                    title={null}
                    icon={<HomeFilled />}
                    data-active={isActive}
                    onClick={handleCloseDrawer}
                    className={styles.sidedrawer__menu__items}
                >
                    <Link href={HOME_PATH}>{t('home')}</Link>
                </Item>
                {renderSections()}
            </Menu>
        );
    };

    return (
        <Drawer
            width={300}
            open={open}
            destroyOnClose
            closable={false}
            placement="left"
            data-theme={value}
            onClose={handleCloseDrawer}
            className={clsx(styles.sidedrawer, `theme_${value}`)}
            footer={
                currentUser?.isLoggedIn && (
                    <DynamicUserAvatar
                        avatar={currentUser?.image}
                        onClick={handleCloseDrawer}
                        userName={currentUser?.userName}
                    />
                )
            }
        >
            {sideMenuContent()}
        </Drawer>
    );
};

export default SideDrawer;
