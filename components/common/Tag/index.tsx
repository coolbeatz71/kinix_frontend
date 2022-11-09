import { FC, useContext } from 'react';

import AntTag from 'antd/lib/tag';

import { useTranslation } from 'react-i18next';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import styles from './index.module.scss';

const { CheckableTag } = AntTag;

export interface ITagProps {
    value: string;
    itemId: string;
    activeTag: string;
    onClick: () => void;
}

const Tag: FC<ITagProps> = ({ itemId, value, onClick, activeTag }) => {
    const isAll = value === 'all';
    const { t } = useTranslation();
    useContext(VisibilityContext).isItemVisible(itemId);

    return (
        <CheckableTag onClick={onClick} data-is-first={isAll} className={styles.tag} checked={value === activeTag}>
            {isAll ? t(value) : value}
        </CheckableTag>
    );
};

export default Tag;
