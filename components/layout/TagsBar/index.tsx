import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { Col, Row, Skeleton } from 'antd';
import Tag from '@components/common/Tag';
import useDarkLight from '@hooks/useDarkLight';
import onWheel, { getId } from '@helpers/tagBarOnWheel';
import { EnumTagsContext } from '@constants/tags-context';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow } from '@components/common/TagsArrow/LeftArrow';
import { RightArrow } from '@components/common/TagsArrow/RightArrow';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));

import styles from './index.module.scss';

export interface ITagsBarProps {
    tags: string[];
    loading: boolean;
    activeTag: string;
    error?: Error | null;
    context: EnumTagsContext;
    onTagSelect: (tag: string) => void;
}

const TagsBar: FC<ITagsBarProps> = ({ context, tags, loading, error, onTagSelect, activeTag }) => {
    const { value } = useDarkLight();
    const isArticleContext = context === EnumTagsContext.ARTICLE;
    const tagsList = ['all', ...tags]?.map((value, idx) => ({ id: getId(idx), value }));

    return (
        <Row className={styles.tags} data-theme={value} data-article-context={isArticleContext}>
            <Col span={24}>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheel}>
                    {loading ? (
                        Array(30)
                            .fill(0)
                            .map((idx) => <Skeleton.Button className="me-2" active key={idx} />)
                    ) : error ? (
                        <DynamicErrorAlert error={error} showIcon closable banner />
                    ) : (
                        tagsList.map((tag) => (
                            <Tag
                                key={tag.id}
                                itemId={tag.id}
                                value={tag.value}
                                activeTag={activeTag}
                                onClick={() => onTagSelect(tag.value)}
                            />
                        ))
                    )}
                </ScrollMenu>
            </Col>
        </Row>
    );
};

export default TagsBar;
