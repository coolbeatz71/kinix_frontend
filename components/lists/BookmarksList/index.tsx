import React, { FC, Fragment, useCallback, useEffect } from 'react';
import { Col, Row } from 'antd';
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

const DynamicServerError = dynamic(() => import('@components/common/ServerError'));
const DynamicBookmarksListSkeleton = dynamic(() => import('@components/skeleton/BookmarksList'));
const DynamicRelatedArticleCard = dynamic(() => import('@components/cards/Article/RelatedArticle'));

const BookmarksList: FC = () => {
    const { t } = useTranslation();
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
            <SectionTitle title={`${t('myBookmarks')} ${bookmarks && `(${bookmarks?.count})`}`} isRelated />
            {error ? (
                <div className="mt-5">
                    <DynamicServerError error={error} onRefresh={loadBookmarks} />
                </div>
            ) : loading ? (
                <DynamicBookmarksListSkeleton />
            ) : isEmpty(bookmarks?.rows) ? (
                <EmptyData type={EnumEmptyDataType.CONTENT} desc={t('noBookmarksFound')} />
            ) : (
                <Row align="middle" gutter={[32, 24]}>
                    {bookmarks?.rows?.map((bookmark: IBookmark) => (
                        <Col key={bookmark.id} xs={24} sm={12} md={8}>
                            <DynamicRelatedArticleCard article={bookmark.article as IArticle} />
                        </Col>
                    ))}
                </Row>
            )}
        </Fragment>
    );
};

export default BookmarksList;
