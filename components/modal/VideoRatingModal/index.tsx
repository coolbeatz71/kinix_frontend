import React, { FC, Fragment, useState } from 'react';
import Lottie from 'react-lottie';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Rate, Typography } from 'antd';
import { CloseCircleOutlined } from 'icons';
import rating from 'public/rating_anim.json';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import { IRootState } from '@redux/reducers';
import addVideoRatingAction from '@redux/ratings/add';
import getNotification from '@helpers/getNotification';
import getLottieOptions from '@helpers/getLottieOptions';
import FormSuccessResult from '@components/form/FormSuccessResult';
import getSingleVideoRatedByUserAction from '@redux/ratings/getUserRate';

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
    const lottieOps = getLottieOptions(rating);
    const [success, setSuccess] = useState<string>('');

    const [rateCount, setRateCount] = useState<number>(0);
    const [hasRated, setHasRated] = useState<boolean>(false);

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
                    <Lottie width={250} height={100} options={lottieOps} />

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
