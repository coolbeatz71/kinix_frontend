import { FC, useEffect, useState } from 'react';

import Grid from 'antd/lib/grid';
import Modal from 'antd/lib/modal';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import Stories from 'react-insta-stories';
import { CloseCircleOutlined } from 'icons';
import { IStory } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';
import { Story } from 'react-insta-stories/dist/interfaces';
import SeeMoreButton from '@components/story/SeeMoreButton';
import getAllStoryAction, { resetStoryAction } from '@redux/stories/all';

import styles from './index.module.scss';

const DynamicStorySeeMore = dynamic(() => import('@components/story/StorySeeMore'));

const { useBreakpoint } = Grid;

const StoryModal: FC = () => {
    const { md } = useBreakpoint();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(true);

    const { data } = useSelector(({ story: { all } }: IRootState) => all);

    useEffect(() => {
        dispatch(getAllStoryAction());
    }, [dispatch]);

    const onCloseModal = (): void => {
        resetStoryAction()(dispatch);
        setOpen(false);
    };

    const getFileType = (type: string): 'image' | 'video' => (/^image/.test(type) ? 'image' : 'video');

    const stories = (data as IStory[])?.map(
        (story): Story => ({
            url: story.media,
            type: getFileType(story.mediaType) === 'image' ? 'image' : 'video',
            seeMoreCollapsed: ({ toggleMore }) => <SeeMoreButton onClick={() => toggleMore(true)} />,
            seeMore: ({ close }: IUnknownObject) => (
                <DynamicStorySeeMore
                    onClose={close}
                    body={story.body}
                    title={story.title}
                    legend={story.legend}
                    subtitle={story.subTitle}
                    redirectUrl={story.redirectUrl}
                    className={styles.storyPopup__seeMore}
                />
            ),
        }),
    );

    return !isEmpty(data) ? (
        <Modal
            title
            open={open}
            footer={null}
            style={{ top: 16 }}
            width={md ? 620 : ''}
            className={styles.storyPopup}
            onCancel={() => onCloseModal()}
            closeIcon={<CloseCircleOutlined />}
        >
            <div className={styles.storyPopup__content}>
                <Stories stories={stories} width="100%" loop defaultInterval={30000} />
            </div>
        </Modal>
    ) : null;
};

export default StoryModal;
