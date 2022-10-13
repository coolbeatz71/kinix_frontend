import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IPlaylistsState = {
    all: IBasicInitialState;
    add: IBasicInitialState;
    single: IBasicInitialState;
    delete: IBasicInitialState;
    removeVideo: IBasicInitialState;
};

export const playlistsInitialState: IPlaylistsState = {
    all: BasicInitialState,
    add: BasicInitialState,
    delete: BasicInitialState,
    single: BasicInitialState,
    removeVideo: BasicInitialState,
};
