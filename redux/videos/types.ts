import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IVideosState = {
    all: IBasicInitialState;
    feed: IBasicInitialState;
    single: IBasicInitialState;
    tags: IBasicInitialStateList;
};

export const videosInitialState: IVideosState = {
    all: BasicInitialState,
    feed: BasicInitialState,
    single: BasicInitialState,
    tags: BasicInitialStateList,
};
