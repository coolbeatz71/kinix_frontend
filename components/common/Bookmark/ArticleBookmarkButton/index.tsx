import React, { FC } from 'react';
import { Button } from 'antd';
import { RiBookmark3Fill } from 'react-icons/ri';
import useDarkLight from '@hooks/useDarkLight';
import styles from './index.module.scss';

export interface IArticleBookmarkButtonProps {
    slug: string;
}

const ArticleBookmarkButton: FC<IArticleBookmarkButtonProps> = ({ slug: _ }) => {
    const { value } = useDarkLight();

    return (
        <Button
            type="text"
            data-theme={value}
            icon={<RiBookmark3Fill />}
            onClick={() => console.log('clicked')}
            className={styles.articleBookmarkButton}
        />
    );
};

export default ArticleBookmarkButton;
