import React, { FC, ReactElement } from 'react';
import { lowerCase, upperFirst } from 'lodash';
import { useRouter } from 'next/router';
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

const { useBreakpoint } = Grid;

const CategoryBar: FC<ICategoryBarProps> = ({ categories, baseUrl = ALL_VIDEOS_PATH, scrolled }) => {
    const { query } = useRouter();
    const { lg, md } = useBreakpoint();

    const categoryId: string | string[] = query?.category || baseUrl;
    const categoryTitles = { [baseUrl]: lowerCase('all') };

    const sizeBreakpoint = md && scrolled !== '' ? 'small' : 'middle';
    const spanBreakpoint = md && scrolled !== '' ? 6 : 7;

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
                <Button size={sizeBreakpoint} type="primary" ghost={`${categoryId}` === baseUrl}>
                    {upperFirst(lowerCase(categoryTitles[`${categoryId}`]))} <DownOutlined />
                </Button>
            </Dropdown>
        );

    return (
        <Row align="middle" justify="space-between" gutter={[39, 0]} className={styles.categoryBar}>
            <Col flex={1} span={15}>
                <Wrapper>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[`${categoryId}`]}
                        onClick={({ key }) => {
                            console.log('key', key);
                        }}
                    >
                        <Menu.Item key={baseUrl}>{upperFirst(lowerCase(categoryTitles[baseUrl]))}</Menu.Item>
                        {categories.map(({ id, name }) => (
                            <Menu.Item key={id}>{upperFirst(lowerCase(name))}</Menu.Item>
                        ))}
                    </Menu>
                </Wrapper>
            </Col>
            <Col span={spanBreakpoint} data-search-col={scrolled !== '' ? 'scrolled' : ''}>
                <SearchInput
                    value=""
                    isCategory
                    allowClear={lg}
                    size={sizeBreakpoint}
                    onChange={(_e) => {
                        //
                    }}
                    onKeyPress={(_e) => {
                        //
                    }}
                />
            </Col>
        </Row>
    );
};

export default CategoryBar;
