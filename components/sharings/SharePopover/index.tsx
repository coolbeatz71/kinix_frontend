import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Popover from 'antd/lib/popover';

import { IRootState } from '@redux/reducers';
import getPayload from '@helpers/getPayload';
import { useAppDispatch } from '@redux/store';
import getVideoSharingsAction from '@redux/sharing/all';
import { IShareType, shareList } from '@constants/social';
import SocialShare from '@components/sharings/SocialShare';
import addVideoSharingAction, { resetAddVideoSharingAction } from '@redux/sharing/add';

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
    const dispatch = useAppDispatch();
    const { data: user } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);

    useEffect(() => {
        if (open) resetAddVideoSharingAction()(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const onSubmitShare = (): void => {
        if (user?.id) {
            dispatch(addVideoSharingAction(slug)).then((res) => {
                setOpen(false);
                if (res.type === 'sharings/add/fulfilled') {
                    dispatch(getVideoSharingsAction(slug));
                    message.success(getPayload(res).message);
                }
            });
        }
    };

    return (
        <Popover
            open={open}
            trigger="click"
            placement="topLeft"
            onOpenChange={(v) => setOpen(v)}
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
