import { FC, useEffect, useState } from 'react';
import numeral from 'numeral';

import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HeartFilled, HeartOutlined } from 'icons';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import addArticleLikeAction from '@redux/likes/add';
import getArticleLikesAction from '@redux/likes/all';
import getUserLikesAction from '@redux/likes/userLikes';
import showAuthRequired from '@helpers/showAuthRequired';
import removeArticleLikeAction from '@redux/likes/unlike';
import { isAllArticleLikeOwner } from '@helpers/isLikeOwner';

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
        if (allUserLikes?.rows && user?.id) {
            setLikeOwner(isAllArticleLikeOwner(slug, user?.id, allUserLikes.rows));
        }
    }, [allUserLikes, slug, user?.id]);

    const likeArticle = (): void => {
        if (user?.id) {
            dispatch(addArticleLikeAction(slug)).then((res) => {
                if (res.type === 'likes/add/rejected') message.error(getPayload(res)?.message);
                else if (res.type === 'likes/add/fulfilled') {
                    dispatch(getUserLikesAction());
                    dispatch(getArticleLikesAction(slug));
                    message.success(getPayload(res).message);
                    setLikeCount((prevCount) => Number(prevCount) + 1);
                }
            });
        } else showAuthRequired(t, dispatch);
    };

    const unlikeArticle = (): void => {
        if (user?.id) {
            dispatch(removeArticleLikeAction(slug)).then((res) => {
                if (res.type === 'likes/unlike/rejected') message.error(getPayload(res)?.message);
                else if (res.type === 'likes/unlike/fulfilled') {
                    dispatch(getUserLikesAction());
                    dispatch(getArticleLikesAction(slug));
                    message.success(getPayload(res).message);
                    setLikeCount((prevCount) => Number(prevCount) - 1);
                }
            });
        } else showAuthRequired(t, dispatch);
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
