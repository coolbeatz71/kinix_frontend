import React, { FC, Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { CloseCircleOutlined } from 'icons';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Rate, Typography } from 'antd';
import getPayload from '@helpers/getPayload';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';
import addVideoRatingAction from '@redux/ratings/add';
import getNotification from '@helpers/getNotification';
import FormSuccessResult from '@components/form/FormSuccessResult';
import getSingleVideoRatedByUserAction from '@redux/ratings/single';

const DynamicLottieAnimation = dynamic(() => import('@components/common/LottieAnimation'));

import styles from './index.module.scss';

const { Text } = Typography;

export interface VideoRatingModalProps {
    slug: string;
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
}

const VideoRatingModal: FC<VideoRatingModalProps> = ({ slug, openModal, setOpenModal }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [success, setSuccess] = useState<string>('');

    const [rateCount, setRateCount] = useState<number>(0);
    const [hasRated, setHasRated] = useState<boolean>(false);

    const [animationData, setAnimationData] = useState<IUnknownObject>();

    const { loading } = useSelector(({ ratings: { add } }: IRootState) => add);

    const onCloseModal = (): void => {
        setOpenModal(false);
    };

    const onSubmitRating = (): void => {
        dispatch(addVideoRatingAction({ slug, count: rateCount })).then((res) => {
            if (res.type === 'ratings/add/fulfilled') {
                setSuccess(getPayload(res).message);
                dispatch(getSingleVideoRatedByUserAction(slug));
            } else if (res.type === 'ratings/add/rejected') getNotification('error', getPayload(res).message);
        });
    };

    useEffect(() => {
        import('public/lottie/rating_anim.json').then((res) => setAnimationData(res.default));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Modal
            centered
            width={420}
            footer={null}
            destroyOnClose
            open={openModal}
            onCancel={onCloseModal}
            className={styles.ratingModal}
            closeIcon={<CloseCircleOutlined />}
        >
            {success ? (
                <FormSuccessResult title={success} onClose={onCloseModal} />
            ) : (
                <Fragment>
                    <DynamicLottieAnimation width="250px" height="100px" animation={animationData as IUnknownObject} />

                    <Text className="d-flex text-center justify-content-center">{t('ratingTitle')}</Text>
                    <div className="my-5 d-flex justify-content-center">
                        <Rate
                            value={rateCount}
                            onChange={(val) => {
                                setHasRated(true);
                                setRateCount(val);
                            }}
                        />
                    </div>
                    <Button
                        block
                        size="large"
                        type="primary"
                        loading={loading}
                        disabled={!hasRated}
                        onClick={() => onSubmitRating()}
                    >
                        {t('send')}
                    </Button>
                </Fragment>
            )}
        </Modal>
    );
};

export default VideoRatingModal;
