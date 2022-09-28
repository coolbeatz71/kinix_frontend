import React, { FC, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { IUnknownObject } from '@interfaces/app';
import { lowerCase, upperFirst } from 'lodash';
import { Row, Grid, Dropdown, Button, Col, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import { ICategoryType } from '@context/video-categories';
import SearchInput from '@components/common/SearchInput';

import styles from './index.module.scss';

export interface ICategoryBarProps {
    baseUrl?: string;
    scrolled: string;
    categories: ICategoryType[];
}

const { Item } = Menu;
const { useBreakpoint } = Grid;

const CategoryBar: FC<ICategoryBarProps> = ({ categories, baseUrl = ALL_VIDEOS_PATH, scrolled }) => {
    const { push } = useRouter();
    const { query } = useRouter();
    const { t } = useTranslation();
    const { lg, md } = useBreakpoint();

    const spanBreakpoint = md && scrolled !== '' ? 6 : 7;
    const sizeBreakpoint = md && scrolled !== '' ? 'small' : 'middle';

    const categoryTitles = { [baseUrl]: lowerCase('all') };
    const category = (query?.category as string) || baseUrl;
    const [search, setSearch] = useState<string>((query?.search as string) || '');

    const navigate = (data: IUnknownObject): void => {
        const query: IUnknownObject = {};

        if (![baseUrl, '', undefined, null].includes(category)) query.category = category;
        if (![baseUrl, '', undefined, null].includes(search)) query.search = search;

        Object.keys(data).map((key) => {
            if ([baseUrl, '', undefined, null].includes(data[key])) delete query[key];
            else query[key] = data[key];
        });

        push({
            query,
            pathname: baseUrl,
        });
    };

    const Wrapper: FC<{ children: ReactElement }> = ({ children }) =>
        lg ? (
            children
        ) : (
            <Dropdown
                arrow
                overlay={children}
                trigger={['click']}
                placement="bottomLeft"
                overlayStyle={{ position: 'fixed' }}
                overlayClassName={styles.categoryBar__dropdown}
            >
                <Button type="primary" size={sizeBreakpoint} ghost={`${category}` === baseUrl}>
                    {upperFirst(t(categoryTitles[`${category}`]?.toLowerCase()))} <DownOutlined />
                </Button>
            </Dropdown>
        );

    return (
        <Row align="middle" justify="space-between" gutter={[39, 0]} className={styles.categoryBar}>
            <Col flex={1} span={15}>
                <Wrapper>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[category]}
                        onClick={({ key }) => {
                            setSearch('');
                            navigate({ category: key, search: '' });
                        }}
                    >
                        <Item key={baseUrl}>{upperFirst(t(categoryTitles[baseUrl]))}</Item>
                        {categories.map(({ name }) => (
                            <Item key={name.toLowerCase()}>{upperFirst(t(name.toLowerCase()))}</Item>
                        ))}
                    </Menu>
                </Wrapper>
            </Col>
            <Col span={spanBreakpoint} data-search-col={scrolled !== '' ? 'scrolled' : ''}>
                <SearchInput
                    isCategory
                    value={search}
                    allowClear={lg}
                    size={sizeBreakpoint}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (e.type !== 'change') navigate({ search: '' });
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            if ([null, '', undefined].includes(search)) setSearch('');
                            else navigate({ category: '' });
                        }
                    }}
                />
            </Col>
        </Row>
    );
};

export default CategoryBar;
