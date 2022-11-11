import { FC } from 'react';
import dayjs from 'dayjs';
import locales from 'locales/';
import en from 'dayjs/locale/en';
import fr from 'dayjs/locale/fr';
import dynamic from 'next/dynamic';
import upperFirst from 'lodash/upperFirst';

import Menu from 'antd/lib/menu';
import Grid from 'antd/lib/grid';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';

import api from 'services/axios';
import { isServer } from '@constants/app';
import useDarkLight from '@hooks/useDarkLight';
import { USER_LANG } from '@constants/platform';
import { languageList } from '@constants/language';

const DynamicCustomIcon = dynamic(() => import('@components/common/CustomIcon'));

import styles from './index.module.scss';

const { Item } = Menu;
const { useBreakpoint } = Grid;

interface ILanguageDropDownProps {
    userLang: 'en' | 'fr' | string;
}

const LanguageDropDown: FC<ILanguageDropDownProps> = ({ userLang }) => {
    const { lg } = useBreakpoint();
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
                    <DynamicCustomIcon type={lang.key === 'en' ? 'english-flag' : 'french-flag'} />{' '}
                    {upperFirst(lang.name)}
                </Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown
            placement="bottomLeft"
            overlay={LanguageMenu}
            className={styles.language}
            trigger={['click', 'hover']}
        >
            <Button
                ghost
                type="primary"
                icon={<DynamicCustomIcon type={userLang === 'en' ? 'english-flag' : 'french-flag'} />}
            >
                {lg && <span data-lang>{userLang?.toUpperCase()}</span>}
            </Button>
        </Dropdown>
    );
};

export default LanguageDropDown;
