import React, { ChangeEventHandler, FC, KeyboardEventHandler } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';

import { SizeType } from 'antd/lib/config-provider/SizeContext';

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
    size = 'middle',
    allowClear = true,
    isCategory = false,
    value = '',
    onChange,
    onKeyPress,
}) => {
    const { value: darkLight } = useDarkLight();

    return (
        <div data-theme={darkLight} className={styles.search}>
            {isCategory ? (
                <Input
                    size={size}
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    allowClear={allowClear}
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
            ) : (
                <Search
                    size={size}
                    value={value}
                    enterButton="Search"
                    allowClear={allowClear}
                    placeholder="Input search text"
                    prefix={<SearchOutlined />}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
            )}
        </div>
    );
};

export default SearchInput;
