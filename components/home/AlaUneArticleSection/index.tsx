import React, { FC, useEffect } from 'react';
import { Button, Row } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import AlaUneArticleList from '@components/common/AlaUneArticleList';
import { ALL_ARTICLE_PATH } from '@constants/paths';
import getFeaturedArticlesAction from '@redux/articles/featured';
import { IArticle } from '@interfaces/articles';
import AlaUneArticleListSkeleton from '@components/skeleton/AlaUneArticleList';

import styles from './index.module.scss';

interface IAlaUneArticleSectionProps {
    canViewAll?: boolean;
}

const AlaUneArticleSection: FC<IAlaUneArticleSectionProps> = ({ canViewAll = true }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    const { fetched, loading, data: articles } = useSelector(({ articles: { featured } }: IRootState) => featured);

    useEffect(() => {
        dispatch(getFeaturedArticlesAction());
    }, [dispatch]);

    return (
        <div data-theme={value} className={styles.alaUneArticleSection}>
            {loading ? <AlaUneArticleListSkeleton /> : <AlaUneArticleList articles={articles as IArticle[]} />}

            {canViewAll && fetched && (
                <Row justify="end">
                    <Link href={ALL_ARTICLE_PATH} passHref>
                        <Button size="large">{t('viewAll')}</Button>
                    </Link>
                </Row>
            )}
        </div>
    );
};

export default AlaUneArticleSection;
