import React, { FC, ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Popover, Row } from 'antd';
import SummaryBody from '../SummaryBody';
import SummaryHeader from '../SummaryHeader';
import IRateSummary from '@interfaces/rates';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import getSingleVideoRateSummaryAction from '@redux/ratings/summary';

const DynamicVideoRatingModal = dynamic(() => import('@components/modal/VideoRatingModal'));
const DynamicRatingSummarySkeleton = dynamic(() => import('@components/skeleton/RatingSummary'));

import styles from './index.module.scss';

export interface IRatingSummaryPopoverProps {
    slug: string;
    open: boolean;
    children: ReactNode;
    setOpen: (v: boolean) => void;
}

const RatingSummaryPopover: FC<IRatingSummaryPopoverProps> = ({ slug, children, open, setOpen }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [openRatingModal, setOpenRatingModal] = useState<boolean>(false);
    const { data: ratings, loading } = useSelector(({ ratings: { summary } }: IRootState) => summary);

    return (
        <Popover
            open={open}
            trigger="click"
            placement="topLeft"
            overlayClassName={styles.ratingPopover}
            onOpenChange={(v) => {
                setOpen(v);
                dispatch(getSingleVideoRateSummaryAction(slug));
            }}
            content={
                <div style={{ width: '10rem' }}>
                    <Row data-content justify="space-between">
                        <Col span={24}>
                            {loading ? (
                                <DynamicRatingSummarySkeleton />
                            ) : (
                                <div className="d-flex flex-column">
                                    <SummaryHeader ratings={ratings as IRateSummary} />
                                    {(ratings as IRateSummary)?.summary?.map((rate) => {
                                        const percentage = (rate.count / Number(ratings?.total)) * 100;
                                        return (
                                            <SummaryBody rate={rate} key={rate.value} percent={percentage.toFixed(2)} />
                                        );
                                    })}
                                </div>
                            )}
                        </Col>
                        <Col span={24} className="pt-3">
                            <Button
                                block
                                ghost
                                type="primary"
                                onClick={() => {
                                    setOpen(true);
                                    setOpenRatingModal(true);
                                }}
                                className={styles.ratingPopover__button}
                            >
                                {t('rateVideo')}
                            </Button>
                        </Col>
                    </Row>
                    <DynamicVideoRatingModal
                        slug={slug}
                        openModal={openRatingModal}
                        setOpenModal={setOpenRatingModal}
                    />
                </div>
            }
        >
            {children}
        </Popover>
    );
};

export default RatingSummaryPopover;
