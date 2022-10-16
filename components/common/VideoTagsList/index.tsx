import React, { FC } from 'react';
import { Tag } from 'antd';
import Link from 'next/link';
import { ALL_VIDEOS_PATH } from '@constants/paths';

import styles from './index.module.scss';

export interface IVideoTagsListProps {
    tags: string[];
}

const VideoTagsList: FC<IVideoTagsListProps> = ({ tags }) => (
    <div className={styles.tagsList}>
        {tags.map((tag) => {
            const link = `${ALL_VIDEOS_PATH}?tag=${tag}`;
            return (
                <Tag key={tag}>
                    <Link href={link} passHref prefetch={false}>{`#${tag}`}</Link>
                </Tag>
            );
        })}
    </div>
);

export default VideoTagsList;
