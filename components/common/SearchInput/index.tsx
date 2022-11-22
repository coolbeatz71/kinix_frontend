import { ChangeEventHandler, FC, KeyboardEventHandler, Ref } from 'react';

import Input, { InputRef } from 'antd/lib/input';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { SearchOutlined } from 'icons';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const { Search } = Input;

export interface ISearchInputProps {
    size?: SizeType;
    noButton?: boolean;
    onBlur?: () => void;
    autoFocus?: boolean;
    allowClear?: boolean;
    onFocus?: () => void;
    onSearch?: () => void;
    dataExpanded?: boolean;
    value?: string | string[];
    inputRef?: Ref<InputRef> | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    onKeyPress?: KeyboardEventHandler<HTMLInputElement> | undefined;
}

const SearchInput: FC<ISearchInputProps> = ({
    onBlur,
    onFocus,
    onChange,
    onSearch,
    inputRef,
    onKeyPress,
    value = '',
    size = 'middle',
    noButton = false,
    autoFocus = false,
    allowClear = true,
    dataExpanded = false,
}) => {
    const { t } = useTranslation();
    const { value: darkLight } = useDarkLight();

    return (
        <div data-theme={darkLight} className={styles.search} data-expanded={dataExpanded}>
            {noButton ? (
                <Input
                    size={size}
                    value={value}
                    ref={inputRef}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                    autoFocus={autoFocus}
                    allowClear={allowClear}
                    onKeyPress={onKeyPress}
                    placeholder={t('search')}
                    prefix={<SearchOutlined />}
                />
            ) : (
                <Search
                    size={size}
                    value={value}
                    ref={inputRef}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSearch={onSearch}
                    onChange={onChange}
                    autoFocus={autoFocus}
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
