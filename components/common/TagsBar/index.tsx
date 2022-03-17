import React, { ContextType, FC } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import useDarkLight from '@hooks/useDarkLight';
import { LeftArrow, RightArrow } from './arrows';
import Tag from './tags';

import styles from './index.module.scss';

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

const getId = (index: number): string => `${index}`;

const items = [
    {
        id: 0,
        value: 'All',
    },
    {
        id: 1,
        value: 'Ndombolo',
    },
    {
        id: 2,
        value: 'Ndombolo',
    },
    {
        id: 3,
        value: 'Ndombolo',
    },
    {
        id: 4,
        value: 'Ndombolo',
    },
    {
        id: 5,
        value: 'Ndombolo',
    },
    {
        id: 6,
        value: 'Ndombolo',
    },
    {
        id: 7,
        value: 'Ndombolo',
    },
    {
        id: 8,
        value: 'All',
    },
    {
        id: 9,
        value: 'Ndombolo',
    },
    {
        id: 10,
        value: 'Ndombolo',
    },
    {
        id: 11,
        value: 'Ndombolo',
    },
    {
        id: 12,
        value: 'Ndombolo',
    },
    {
        id: 13,
        value: 'Ndombolo',
    },
    {
        id: 14,
        value: 'Ndombolo',
    },
    {
        id: 15,
        value: 'Ndombolo',
    },
    {
        id: 16,
        value: 'Ndombolo',
    },
    {
        id: 17,
        value: 'Ndombolo',
    },
    {
        id: 18,
        value: 'Ndombolo',
    },
    {
        id: 19,
        value: 'Ndombolo',
    },
];

const TagsBar: FC = () => {
    const { value } = useDarkLight();

    return (
        <div className={styles.tags} data-theme={value}>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
                {items.map((tag) => (
                    <Tag key={tag.id} itemId={getId(tag.id)} value={tag.value} />
                ))}
            </ScrollMenu>
        </div>
    );
};

const onWheel = (apiObj: scrollVisibilityApiType, e: React.WheelEvent): void => {
    const isThouchpad = Math.abs(e.deltaX) !== 0 || Math.abs(e.deltaY) < 15;

    if (isThouchpad) {
        e.stopPropagation();
        return;
    }

    if (e.deltaY < 0) apiObj.scrollNext();
    else if (e.deltaY > 0) apiObj.scrollPrev();
};

export default TagsBar;
