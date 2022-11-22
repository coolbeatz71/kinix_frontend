import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import PlaylistCardSkeleton from '../PlaylistCard';

export interface IPlaylistsListSkeletonProps {
    isSearchResult?: boolean;
}

const PlaylistsListSkeleton: FC<IPlaylistsListSkeletonProps> = ({ isSearchResult = false }) => (
    <Row align="middle" gutter={[32, 32]}>
        {Array.from(Array(6).keys()).map((i) => (
            <Col key={i} xs={24} sm={24} md={isSearchResult ? 24 : 12}>
                <PlaylistCardSkeleton />
            </Col>
        ))}
    </Row>
);

export default PlaylistsListSkeleton;
