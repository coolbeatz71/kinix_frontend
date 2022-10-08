import React, { FC } from 'react';
import Link from 'next/link';
import { Space, Tag } from 'antd';
import { ALL_ARTICLES_PATH } from '@constants/paths';

import styles from './index.module.scss';

export interface IArticleTagsProps {
    tags: string[] | null;
}

const ArticleTags: FC<IArticleTagsProps> = ({ tags }) => (
    <div className={styles.articleTags}>
        <Space>
            {tags?.map((tag, idx) => {
                const link = `${ALL_ARTICLES_PATH}?tag=${tag}`;
                return (
                    <Tag key={idx}>
                        <Link href={link} passHref>{`#${tag}`}</Link>
                    </Tag>
                );
            })}
        </Space>
    </div>
);

export default ArticleTags;
