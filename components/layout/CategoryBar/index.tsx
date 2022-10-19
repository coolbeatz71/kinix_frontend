import React, { FC, ReactElement, useState } from 'react';
import { DownOutlined } from 'icons';
import { useRouter } from 'next/router';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';
import { IUnknownObject } from '@interfaces/app';
import { Row, Grid, Dropdown, Button, Col, Menu } from 'antd';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import SearchInput from '@components/common/SearchInput';
import { ICategoryType } from '@context/video-categories';

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

    const category = query?.category as string;
    const [search, setSearch] = useState<string>((query?.search as string) || '');

    const navigate = (data: IUnknownObject): void => {
        const query: IUnknownObject = {};

        if (![baseUrl, '', undefined, null].includes(search)) query.search = search;
        if (![baseUrl, '', undefined, null].includes(category)) query.category = category;

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
                    {t(category || 'all')} <DownOutlined />
                </Button>
            </Dropdown>
        );

    return (
        <Row align="middle" justify="space-between" gutter={[39, 0]} className={styles.categoryBar}>
            <Col flex={1} span={15}>
                <Wrapper>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[category || 'all']}
                        onClick={({ key }) => {
                            setSearch('');
                            navigate({ category: key !== 'all' ? key : '', search: '' });
                        }}
                    >
                        <Item key="all">{upperFirst(t('all'))}</Item>
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
                    size="middle"
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
