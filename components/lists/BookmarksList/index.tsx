import { FC, Fragment, useCallback, useEffect } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Grid from 'antd/lib/grid';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { IBookmark, IArticle } from '@interfaces/api';
import EmptyData from '@components/common/EmptyData';
import SectionTitle from '@components/common/SectionTitle';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import getUserBookmarksAction from '@redux/bookmarks/userBookmarks';

const { useBreakpoint } = Grid;

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicRelatedArticleCard = dynamic(() => import('@components/cards/Article/RelatedArticle'));
const DynamicBookmarksListSkeleton = dynamic(() => import('@components/skeleton/FavoriteArticlesList'));

const BookmarksList: FC = () => {
    const { t } = useTranslation();
    const { lg } = useBreakpoint();
    const dispatch = useAppDispatch();
    const { loading, data: bookmarks, error } = useSelector(({ bookmarks: { user } }: IRootState) => user);

    const loadBookmarks = useCallback(() => {
        dispatch(getUserBookmarksAction());
    }, [dispatch]);

    useEffect(() => {
        loadBookmarks();
    }, [loadBookmarks]);

    return (
        <Fragment>
            <SectionTitle
                title={`${t('myBookmarks')} ${!isEmpty(bookmarks) ? `(${bookmarks?.count})` : ''}`}
                isRelated
            />
            {error ? (
                <DynamicServerError error={error} onRefresh={loadBookmarks} />
            ) : loading ? (
                <DynamicBookmarksListSkeleton />
            ) : isEmpty(bookmarks?.rows) ? (
                <EmptyData type={EnumEmptyDataType.BOOKMARK} desc={t('noBookmarksFound')} />
            ) : (
                <Row align="middle" gutter={[lg ? 32 : 24, 0]}>
                    {bookmarks?.rows?.map((bookmark: IBookmark) => (
                        <Col key={bookmark.id} xs={24} sm={24} md={12} lg={12} xl={8}>
                            <DynamicRelatedArticleCard article={bookmark.article as IArticle} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};

export default BookmarksList;
