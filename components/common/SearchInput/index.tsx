import React, { ChangeEventHandler, FC, KeyboardEventHandler } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { SearchOutlined } from 'icons';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const { Search } = Input;

export interface ISearchInputProps {
    size?: SizeType;
    allowClear?: boolean;
    isCategory?: boolean;
    value?: string | string[];
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    onKeyPress?: KeyboardEventHandler<HTMLInputElement> | undefined;
}

const SearchInput: FC<ISearchInputProps> = ({
    onChange,
    onKeyPress,
    value = '',
    size = 'middle',
    allowClear = true,
    isCategory = false,
}) => {
    const { t } = useTranslation();
    const { value: darkLight } = useDarkLight();

    return (
        <div data-theme={darkLight} className={styles.search}>
            {isCategory ? (
                <Input
                    size={size}
                    value={value}
                    onChange={onChange}
                    allowClear={allowClear}
                    onKeyPress={onKeyPress}
                    placeholder={t('search')}
                    prefix={<SearchOutlined />}
                />
            ) : (
                <Search
                    size={size}
                    value={value}
                    onChange={onChange}
                    allowClear={allowClear}
                    onKeyPress={onKeyPress}
                    enterButton={t('search')}
                    prefix={<SearchOutlined />}
                    placeholder={t('searchText')}
                />
            )}
        </div>
    );
};

export default SearchInput;
