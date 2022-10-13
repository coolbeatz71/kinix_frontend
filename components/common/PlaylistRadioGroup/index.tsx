import React, { FC } from 'react';
import { uniqBy } from 'lodash';
import { RadioChangeEvent, Radio, Space, Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { IPlaylist } from '@interfaces/api';
import { IUnknownObject } from '@interfaces/app';

export interface IPlaylistRadioGroupProps {
    loading: boolean;
    playlists: IUnknownObject;
    onSelectPlaylist: (e: RadioChangeEvent) => void;
    selectedPlaylist: { title: string; slug: string };
}
const PlaylistRadioGroup: FC<IPlaylistRadioGroupProps> = ({
    loading,
    playlists,
    selectedPlaylist,
    onSelectPlaylist,
}) => (
    <Radio.Group value={selectedPlaylist} onChange={onSelectPlaylist}>
        <Space direction="vertical" className="w-100">
            {uniqBy(playlists?.rows as IPlaylist[], 'title').map((playlist) => (
                <Radio value={playlist} key={playlist.id}>
                    <span data-radio-content>
                        {playlist.title}{' '}
                        {loading && playlist.slug === selectedPlaylist.slug && (
                            <Spin size="small" indicator={<SyncOutlined spin />} />
                        )}
                    </span>
                </Radio>
            ))}
        </Space>
    </Radio.Group>
);

export default PlaylistRadioGroup;
