import React, { FC } from 'react';
import { Button, Col, Row } from 'antd';
import StarRatingComponent from 'react-star-rating-component';
import { RiPlayListAddFill } from 'react-icons/ri';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';

export interface ISingleVideoActionProps {
    likeCount: number;
    commentCount: number;
}

const SingleVideoAction: FC<ISingleVideoActionProps> = ({ likeCount, commentCount }) => {
    return (
        <Row justify="space-between" align="middle">
            <Col span={12}>
                <StarRatingComponent name="video-rate" starCount={5} value={3} />
            </Col>
            <Col span={12} className="d-flex justify-content-end">
                <Button data-like type="link" icon={<HeartOutlined />}>
                    <span data-count>{likeCount}</span>
                </Button>
                <Button data-comment type="link" icon={<CommentOutlined />}>
                    <span data-count>{commentCount}</span>
                </Button>
                <Button type="link" icon={<RiPlayListAddFill />} />
            </Col>
        </Row>
    );
};

export default SingleVideoAction;
