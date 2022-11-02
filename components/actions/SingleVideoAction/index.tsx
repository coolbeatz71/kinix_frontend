import React, { FC, useState } from 'react';
import numeral from 'numeral';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { RiPlayListAddFill } from 'react-icons/ri';
import { Button, Col, Rate, Row, Space, Tooltip } from 'antd';
import { CommentOutlined, LikeOutlined } from 'icons';
import { IVideo } from '@interfaces/api';
import { IItemsEntity } from '@interfaces/youtube';

const DynamicVideoCardAction = dynamic(() => import('../VideoCardAction'));
const DynamicVideoRatingModal = dynamic(() => import('@components/modal/VideoRatingModal'));

export interface ISingleVideoActionProps {
    video: IVideo;
    youtubeVideoEntity: IItemsEntity;
}

const SingleVideoAction: FC<ISingleVideoActionProps> = ({ video, youtubeVideoEntity }) => {
    const { avgRate } = video;
    const { t } = useTranslation();
    const likesCount = youtubeVideoEntity?.statistics?.likeCount;
    const commentsCount = youtubeVideoEntity?.statistics?.commentCount;

    const likes = numeral(likesCount).format('0.[00]a');
    const comments = numeral(commentsCount).format('0.[00]a');
    const playlists = numeral(video.playlistsCount).format('0.[00]a');

    const [openRatingModal, setOpenRatingModal] = useState<boolean>(false);

    return (
        <Row justify="space-between" align="middle">
            <Col span={12} className="d-flex align-content-center">
                <Rate value={Number(avgRate)} onChange={() => setOpenRatingModal(true)} />
            </Col>
            <Space className="d-flex justify-content-end">
                <Tooltip title={t('likesFromYoutube')} placement="topRight">
                    <Button data-like type="text" icon={<LikeOutlined />}>
                        <span data-count>{Number(likesCount) > 0 && likes}</span>
                    </Button>
                </Tooltip>
                <Tooltip title={t('commentsFromYoutube')} placement="topRight">
                    <Button data-comment type="text" icon={<CommentOutlined />}>
                        <span data-count>{Number(commentsCount) > 0 && comments}</span>
                    </Button>
                </Tooltip>
                <DynamicVideoCardAction videoId={video?.id as number} context="standalone">
                    <Button data-playlist type="link" icon={<RiPlayListAddFill />}>
                        <span data-count>{Number(video.playlistsCount) > 0 && playlists}</span>
                    </Button>
                </DynamicVideoCardAction>
            </Space>
            <DynamicVideoRatingModal slug={video.slug} openModal={openRatingModal} setOpenModal={setOpenRatingModal} />
        </Row>
    );
};

export default SingleVideoAction;
