import React, { FC } from 'react';
import { Space, Tag } from 'antd';

import styles from './index.module.scss';
import Link from 'next/link';

const ArticleFooter: FC = () => {
    return (
        <div className={styles.articleFooter}>
            <Space>
                <Tag>
                    <Link href="#java">#Java</Link>
                </Tag>
                <Tag>#NodeJS</Tag>
                <Tag>#React-native</Tag>
                <Tag>#Java</Tag>
                <Tag>#React-native</Tag>
                <Tag>#NodeJS</Tag>
                <Tag>#React-native</Tag>
                <Tag>#NodeJS</Tag>
                <Tag>#NodeJS</Tag>
                <Tag>#Java</Tag>
                <Tag>#Java</Tag>
            </Space>
        </div>
    );
};

export default ArticleFooter;
