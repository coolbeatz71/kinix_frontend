import React, { FC, useContext } from 'react';
import { Tag as AntTag } from 'antd';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import styles from './index.module.scss';

const { CheckableTag } = AntTag;

export interface ITagProps {
    itemId: string;
    value: string;
}

const Tag: FC<ITagProps> = ({ itemId, value }) => {
    useContext(VisibilityContext).isItemVisible(itemId);

    return (
        <CheckableTag className={styles.tag} checked={itemId === '0'} data-is-first={itemId === '0'}>
            {value}
        </CheckableTag>
    );
};

export default Tag;
