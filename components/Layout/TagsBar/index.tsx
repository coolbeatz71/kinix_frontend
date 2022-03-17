import React, { FC } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';
import { LeftArrow } from '@components/common/TagsArrow/LeftArrow';
import { RightArrow } from '@components/common/TagsArrow/RightArrow';
import Tag from '@components/common/Tag';
import onWheel, { getId } from '@helpers/tagBarOnWheel';

const TagsBar: FC = () => {
    const { value } = useDarkLight();
    const items = Array(120)
        .fill(0)
        .map((_, i) => ({ id: getId(i), value: `tag number ${i}` }));

    return (
        <div className={styles.tags} data-theme={value}>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
                {items.map((tag) => (
                    <Tag key={tag.id} itemId={tag.id} value={tag.value} />
                ))}
            </ScrollMenu>
        </div>
    );
};

export default TagsBar;
