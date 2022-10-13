import React, { FC, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, message, Popover } from 'antd';
import { useAppDispatch } from '@redux/store';
import SocialShare from '@components/common/SocialShare';
import { IShareType, shareList } from '@constants/social';
import addVideoSharingAction, { resetAddVideoSharingAction } from '@redux/sharing/add';
import getVideoSharingsAction from '@redux/sharing/all';

import styles from './index.module.scss';

export interface ISharePopoverProps {
    slug: string;
    link: string;
    title: string;
    open: boolean;
    children: ReactNode;
    setOpen: (v: boolean) => void;
}
const shares = [shareList[1], shareList[2], shareList[3], shareList[4]];

const SharePopover: FC<ISharePopoverProps> = ({ open, setOpen, children, link, title, slug }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (open) resetAddVideoSharingAction()(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const onSubmitShare = (): void => {
        dispatch(addVideoSharingAction(slug)).then((res) => {
            setOpen(false);
            if (res.type === 'sharings/add/fulfilled') {
                dispatch(getVideoSharingsAction(slug));
                message.success(t('sharingSuccess'));
            }
        });
    };

    return (
        <Popover
            visible={open}
            trigger="click"
            placement="topLeft"
            onVisibleChange={(v) => setOpen(v)}
            overlayClassName={styles.sharePopover}
            content={
                <div data-content className="d-flex justify-content-between p-1">
                    {shares.map((share) => (
                        <SocialShare key={share.name} type={share.name as IShareType} link={link} title={title}>
                            <Button
                                shape="circle"
                                icon={share.icon}
                                onClick={onSubmitShare}
                                data-platform={share.name}
                                className={styles.sharePopover__button}
                            />
                        </SocialShare>
                    ))}
                </div>
            }
        >
            {children}
        </Popover>
    );
};

export default SharePopover;
