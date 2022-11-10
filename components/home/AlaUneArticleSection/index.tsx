import { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { IArticle } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { ALL_ARTICLES_PATH } from '@constants/paths';
import getFeaturedArticlesAction from '@redux/articles/featured';

const DynamicViewAllButton = dynamic(() => import('@components/common/ViewAllButton'));
const DynamicAlaUneArticleList = dynamic(() => import('@components/lists/AlaUneArticleList'));
const DynamicAlaUneArticleListSkeleton = dynamic(() => import('@components/skeleton/AlaUneArticleList'));

import styles from './index.module.scss';

interface IAlaUneArticleSectionProps {
    limit?: number;
    canViewAll?: boolean;
}

const AlaUneArticleSection: FC<IAlaUneArticleSectionProps> = ({ limit, canViewAll = true }) => {
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    const { fetched, loading, data: articles } = useSelector(({ articles: { featured } }: IRootState) => featured);

    useEffect(() => {
        dispatch(getFeaturedArticlesAction({ limit }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div data-theme={value} className={styles.alaUneArticleSection}>
            {loading ? (
                <DynamicAlaUneArticleListSkeleton />
            ) : (
                <DynamicAlaUneArticleList articles={articles as IArticle[]} />
            )}

            {canViewAll && fetched && <DynamicViewAllButton link={ALL_ARTICLES_PATH} />}
        </div>
    );
};

export default AlaUneArticleSection;
