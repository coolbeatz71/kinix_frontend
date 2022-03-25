import React, { FC } from 'react';
import { Tag } from 'antd';
import Link from 'next/link';

import styles from './index.module.scss';

export interface IVideoTagsListProps {
    tags: { value: string; link: string }[];
}

const VideoTagsList: FC<IVideoTagsListProps> = ({ tags }) => {
    return (
        <div className={styles.tagsList}>
            {tags.map((tag) => (
                <Tag key={tag.value}>
                    <Link href={tag.link} passHref>
                        {`#${tag.value}`}
                    </Link>
                </Tag>
            ))}
        </div>
    );
};

export default VideoTagsList;
