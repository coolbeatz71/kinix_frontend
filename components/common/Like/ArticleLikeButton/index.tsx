import React, { FC, useEffect, useState } from 'react';
import numeral from 'numeral';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { isAllArticleLikeOwner } from '@helpers/isLikeOwner';
import addArticleLikeAction from '@redux/likes/add';
import getArticleLikesAction from '@redux/likes/all';
import getUserLikesAction from '@redux/likes/userLikes';
import removeArticleLikeAction from '@redux/likes/unlike';

import styles from './index.module.scss';

export interface IArticleLikeButtonProps {
    slug: string;
    count: number;
}

const ArticleLikeButton: FC<IArticleLikeButtonProps> = ({ slug, count }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    const [likeCount, setLikeCount] = useState(count);
    const [likeOwner, setLikeOwner] = useState<boolean | undefined>(false);

    const { data: allUserLikes } = useSelector(({ likes: { user } }: IRootState) => user);
    const { data: user } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);

    const likes = numeral(likeCount).format('0.[00]a');

    useEffect(() => {
        if (allUserLikes?.rows) {
            setLikeOwner(isAllArticleLikeOwner(slug, user.id, allUserLikes.rows));
        }
    }, [allUserLikes, slug, user.id]);

    const likeArticle = (): void => {
        dispatch(addArticleLikeAction(slug)).then((res) => {
            if (res.type === 'likes/add/rejected') message.error(res.payload?.message);
            else if (res.type === 'likes/add/fulfilled') {
                dispatch(getUserLikesAction());
                dispatch(getArticleLikesAction(slug));
                message.success(t('likingSuccess'));
                setLikeCount((prevCount) => Number(prevCount) + 1);
            }
        });
    };

    const unlikeArticle = (): void => {
        dispatch(removeArticleLikeAction(slug)).then((res) => {
            if (res.type === 'likes/unlike/rejected') message.error(res.payload?.message);
            else if (res.type === 'likes/unlike/fulfilled') {
                dispatch(getUserLikesAction());
                dispatch(getArticleLikesAction(slug));
                message.success(t('unLikingSuccess'));
                setLikeCount((prevCount) => Number(prevCount) - 1);
            }
        });
    };

    return (
        <Button
            type="text"
            data-theme={value}
            className={styles.articleLikeButton}
            onClick={likeOwner ? unlikeArticle : likeArticle}
            icon={likeOwner ? <HeartFilled data-liked /> : <HeartOutlined />}
        >
            &nbsp;{count > 0 ? likes : ''}
        </Button>
    );
};

export default ArticleLikeButton;
