import React, { FC } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import styles from './index.module.scss';

const { Search } = Input;

const SearchInput: FC<any> = () => {
    return (
        <div data-theme="light" className={styles.search}>
            <Search
                allowClear
                enterButton="Search"
                placeholder="Input search text"
                prefix={<SearchOutlined />}
                onChange={(_e: any) => {
                    //
                }}
                onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                        //
                    }
                }}
            />
        </div>
    );
};

export default SearchInput;
