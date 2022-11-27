import { FC, useState } from 'react';
import numeral from 'numeral';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { RiPlayListAddFill } from 'react-icons/ri';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Rate from 'antd/lib/rate';
import Grid from 'antd/lib/grid';
import Space from 'antd/lib/space';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';

import { CommentOutlined, LikeOutlined } from 'icons';
import { IVideo } from '@interfaces/api';
import { IItemsEntity } from '@interfaces/youtube';

const DynamicVideoCardAction = dynamic(() => import('../VideoCardAction'));
const DynamicVideoRatingModal = dynamic(() => import('@components/modal/VideoRatingModal'));

const { useBreakpoint } = Grid;
export interface ISingleVideoActionProps {
    video: IVideo;
    youtubeVideoEntity: IItemsEntity;
}

const SingleVideoAction: FC<ISingleVideoActionProps> = ({ video, youtubeVideoEntity }) => {
    const { avgRate } = video;
    const { md } = useBreakpoint();
    const { t } = useTranslation();
    const likesCount = youtubeVideoEntity?.statistics?.likeCount;
    const commentsCount = youtubeVideoEntity?.statistics?.commentCount;

    const likes = numeral(likesCount).format('0.[00]a');
    const comments = numeral(commentsCount).format('0.[00]a');
    const playlists = numeral(video.playlistsCount).format('0.[00]a');

    const [openRatingModal, setOpenRatingModal] = useState<boolean>(false);

    return (
        <Row justify="space-between" align="middle">
            <Col
                xs={24}
                sm={24}
                md={12}
                className={`d-flex align-content-center ${md ? 'justify-content-start' : 'justify-content-end'}`}
            >
                <Rate value={Number(avgRate)} onChange={() => setOpenRatingModal(true)} />
            </Col>
            <Col xs={24} sm={24} md={12} className="justify-content-end">
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
            </Col>
            <DynamicVideoRatingModal slug={video.slug} openModal={openRatingModal} setOpenModal={setOpenRatingModal} />
        </Row>
    );
};

export default SingleVideoAction;
