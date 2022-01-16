import React, { FC } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';
import { IUnknownObject } from '@type/app';

const { Search } = Input;

const SearchInput: FC<IUnknownObject> = () => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.search}>
            <Search
                allowClear
                enterButton="Search"
                placeholder="Input search text"
                prefix={<SearchOutlined />}
                onChange={(_e: IUnknownObject) => {
                    //
                }}
                onKeyPress={(e: IUnknownObject) => {
                    if (e.key === 'Enter') {
                        //
                    }
                }}
            />
        </div>
    );
};

export default SearchInput;
