import React, { FC, ReactElement } from 'react';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { Row, Grid, Dropdown, Button, Col, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import { CatType } from '@context/video-categories';
import SearchInput from '@components/common/SearchInput';

export interface ICategoryBarProps {
    categories: CatType[];
    baseUrl?: string;
    scrolled: string;
}

const { useBreakpoint } = Grid;

const CategoryBar: FC<ICategoryBarProps> = ({ categories, baseUrl = ALL_VIDEOS_PATH, scrolled }) => {
    const { query } = useRouter();
    const screens = useBreakpoint();

    const categoryId: string | string[] = query?.category_id || baseUrl;
    const categoryTitles = { [baseUrl]: capitalize('all') };

    const Wrapper: FC<{ children: ReactElement }> = ({ children }) =>
        screens.lg ? (
            children
        ) : (
            <Dropdown
                arrow
                overlay={children}
                trigger={['click']}
                placement="bottomLeft"
                overlayStyle={{ position: 'fixed' }}
            >
                <Button size={scrolled !== '' ? 'small' : 'middle'} type="primary" ghost={`${categoryId}` === baseUrl}>
                    {capitalize(categoryTitles[`${categoryId}`])} <DownOutlined />
                </Button>
            </Dropdown>
        );

    return (
        <Row align="middle">
            <Col flex={1}>
                <Wrapper>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[`${categoryId}`]}
                        onClick={({ key }) => {
                            console.log('key', key);
                        }}
                    >
                        <Menu.Item key={baseUrl}>{capitalize(categoryTitles[baseUrl])}</Menu.Item>
                        {categories.map(({ id, title }) => (
                            <Menu.Item key={id}>{capitalize(title)}</Menu.Item>
                        ))}
                    </Menu>
                </Wrapper>
            </Col>
            <Col data-search-col={scrolled !== '' ? 'scrolled' : ''}>
                <SearchInput
                    value=""
                    allowClear={screens.lg}
                    size={scrolled !== '' ? 'small' : 'middle'}
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
