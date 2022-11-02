import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IPlaylistsState = {
    all: IBasicInitialState;
    add: IBasicInitialState;
    single: IBasicInitialState;
    delete: IBasicInitialState;
    details: IBasicInitialStateList;
    removeVideo: IBasicInitialState;
};

export const playlistsInitialState: IPlaylistsState = {
    all: BasicInitialState,
    add: BasicInitialState,
    delete: BasicInitialState,
    single: BasicInitialState,
    details: BasicInitialStateList,
    removeVideo: BasicInitialState,
};
