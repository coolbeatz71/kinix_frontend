import React, { FC } from 'react';
import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import fr from 'dayjs/locale/fr';
import { Button, Dropdown, Menu } from 'antd';
import { upperFirst } from 'lodash';
import CustomIcon from '@components/common/CustomIcon';
import { languageList } from '@constants/language';
import locales from 'locales/';
import useDarkLight from '@hooks/useDarkLight';
import { USER_LANG } from '@constants/platform';
import { isServer } from '@constants/app';
import api from 'services/axios';

import styles from './index.module.scss';

const { Item } = Menu;

interface ILanguageDropDownProps {
    userLang: 'en' | 'fr' | string;
}

const LanguageDropDown: FC<ILanguageDropDownProps> = ({ userLang }) => {
    const { value } = useDarkLight();
    const updateLanguage = (lang: string): void => {
        locales.changeLanguage(lang);
        dayjs.locale(lang === 'en' ? en : fr);
        api.defaults.headers['Accept-Language'] = lang;
        !isServer && localStorage.setItem(USER_LANG, lang);
    };

    const LanguageMenu = (
        <Menu className={styles.language__menu} data-theme={value}>
            {languageList.map((lang) => (
                <Item
                    key={lang.key}
                    onClick={() => {
                        updateLanguage(lang.key);
                    }}
                >
                    <CustomIcon type={lang.key === 'en' ? 'english-flag' : 'french-flag'} /> {upperFirst(lang.name)}
                </Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={LanguageMenu} placement="bottomLeft" className={styles.language}>
            <Button
                ghost
                type="primary"
                icon={<CustomIcon type={userLang === 'en' ? 'english-flag' : 'french-flag'} />}
            >
                <span data-lang>{userLang?.toUpperCase()}</span>
            </Button>
        </Dropdown>
    );
};

export default LanguageDropDown;
