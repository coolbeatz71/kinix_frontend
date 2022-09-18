import React, { FC } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';
import { LeftArrow } from '@components/common/TagsArrow/LeftArrow';
import { RightArrow } from '@components/common/TagsArrow/RightArrow';
import Tag from '@components/common/Tag';
import onWheel, { getId } from '@helpers/tagBarOnWheel';
import { Col, Row } from 'antd';
import { EnumTagsContext } from '@constants/tags-context';

export interface ITagsBarProps {
    context: EnumTagsContext;
}

const TagsBar: FC<ITagsBarProps> = ({ context }) => {
    const { value } = useDarkLight();
    const items = Array(15)
        .fill(0)
        .map((_, i) => ({ id: getId(i), value: `tag number ${i}` }));

    const isArticleContext = context === EnumTagsContext.ARTICLE;

    return (
        <Row className={styles.tags} data-theme={value} data-article-context={isArticleContext}>
            <Col span={24}>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
                    {items.map((tag) => (
                        <Tag key={tag.id} itemId={tag.id} value={tag.value} />
                    ))}
                </ScrollMenu>
            </Col>
        </Row>
    );
};

export default TagsBar;
