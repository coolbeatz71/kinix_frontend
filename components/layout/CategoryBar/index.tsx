import { FC, ReactElement, useState } from 'react';
import { DownOutlined } from 'icons';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Grid from 'antd/lib/grid';
import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';

import { IUnknownObject } from '@interfaces/app';
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
    const { lg, md, xs, sm } = useBreakpoint();

    const [isExpanded, setIsExpanded] = useState(false);

    const spanBreakpoint = md && scrolled !== '' ? 7 : 8;

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
                <Button type="primary" ghost={`${category}` === baseUrl}>
                    {t(category || 'all')} <DownOutlined />
                </Button>
            </Dropdown>
        );

    return (
        <Row align="middle" justify="space-between" gutter={[39, 0]} className={styles.categoryBar}>
            <Col flex={1} xs={9} sm={10} md={12} lg={15}>
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
            <Col xs={15} sm={14} md={12} lg={spanBreakpoint} data-search-col={scrolled !== '' ? 'scrolled' : ''}>
                <SearchInput
                    noButton
                    size="middle"
                    value={search}
                    allowClear={lg}
                    dataExpanded={isExpanded}
                    onFocus={() => {
                        if (xs && !sm && !lg) setIsExpanded(true);
                    }}
                    onBlur={() => {
                        if (xs && !sm && !lg && isEmpty(search)) setIsExpanded(false);
                    }}
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
