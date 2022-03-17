import React, { FC, useContext } from 'react';
import { Tag as AntTag } from 'antd';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

const { CheckableTag } = AntTag;

export interface ITagProps {
    itemId: string;
    value: string;
}

const Tag: FC<ITagProps> = ({ itemId, value }) => {
    const visibility = useContext(VisibilityContext);
    visibility.isItemVisible(itemId);

    return (
        <CheckableTag style={{ margin: '0 0.5rem' }} checked={itemId === '0'}>
            {value}
        </CheckableTag>
    );
};

export default Tag;
