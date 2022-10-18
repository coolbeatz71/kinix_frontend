import React, { FC, useState, useEffect } from 'react';
import numeral from 'numeral';
import { Button } from 'antd';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { ShareAltOutlined } from 'icons';
import { IRootState } from '@redux/reducers';
import useDarkLight from '@hooks/useDarkLight';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import getPlatformUrl from '@helpers/getPlatformUrl';

const DynamicSharePopover = dynamic(() => import('@components/sharings/SharePopover'));

import styles from './index.module.scss';

export interface IVideoShareButtonProps {
    slug: string;
    title: string;
    count: number;
}

const VideoShareButton: FC<IVideoShareButtonProps> = ({ count, slug, title }) => {
    const { value } = useDarkLight();

    const [shareCount, setShareCount] = useState(count);
    const shares = numeral(shareCount).format('0.[00]a');
    const sharedLink = `${getPlatformUrl()}${ALL_VIDEOS_PATH}/${slug}`;

    const [openSharePopup, setOpenSharePopup] = useState(false);

    const {
        all: { data: allShares },
        add: { data: addedShare },
    } = useSelector(({ sharing }: IRootState) => sharing);

    useEffect(() => {
        const videoMatch = slug === addedShare.slug;
        if (allShares?.count && videoMatch) setShareCount(allShares?.count);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addedShare]);

    return (
        <DynamicSharePopover
            slug={slug}
            title={title}
            link={sharedLink}
            open={openSharePopup}
            setOpen={setOpenSharePopup}
        >
            <Button
                type="link"
                data-theme={value}
                icon={<ShareAltOutlined />}
                className={styles.videoShareButton}
                onClick={() => setOpenSharePopup(true)}
            >
                &nbsp;{shareCount > 0 ? shares : ''}
            </Button>
        </DynamicSharePopover>
    );
};

export default VideoShareButton;
