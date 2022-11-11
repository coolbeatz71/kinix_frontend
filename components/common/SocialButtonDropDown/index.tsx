import { FC } from 'react';
import { ShareAltOutlined } from 'icons';

import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';

import upperFirst from 'lodash/upperFirst';
import socialList from '@constants/social';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const { Item } = Menu;

const SocialButtonDropDown: FC = () => {
    const { value } = useDarkLight();

    const SocialMenu = (
        <Menu className={styles.shareDropdown__menu} data-theme={value}>
            {socialList.map((social) => (
                <Item key={social.name} data-platform={social.name} onClick={() => window?.open(social.url, '_blank')}>
                    {social.icon} {upperFirst(social.name)}
                </Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown
            overlay={SocialMenu}
            placement="bottomLeft"
            trigger={['click', 'hover']}
            className={styles.shareDropdown}
        >
            <Button danger type="primary" icon={<ShareAltOutlined />} />
        </Dropdown>
    );
};

export default SocialButtonDropDown;
