import React, { FC } from 'react';
import { IUnknownObject } from 'interfaces/app';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';
import AlaUneArticleList from '@components/common/AlaUneArticleList';
import { Button, Row } from 'antd';
import Link from 'next/link';
import { ALL_ARTICLE_PATH } from '@constants/paths';

interface IAlaUneArticleSectionProps {
    fetched: boolean;
    error: string | null;
    articles: IUnknownObject[];
}

const AlaUneArticleSection: FC<IAlaUneArticleSectionProps> = ({ fetched, error, articles }) => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.alaUneArticleSection}>
            <AlaUneArticleList fetched={fetched} error={error} articles={articles} />

            <Row justify="end">
                <Link href={ALL_ARTICLE_PATH} passHref>
                    <Button size="large">View All</Button>
                </Link>
            </Row>
        </div>
    );
};

export default AlaUneArticleSection;
