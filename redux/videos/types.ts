import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IVideosState = {
    all: IBasicInitialState;
    feed: IBasicInitialState;
    tags: IBasicInitialStateList;
};

export const videosInitialState: IVideosState = {
    all: BasicInitialState,
    feed: BasicInitialState,
    tags: BasicInitialStateList,
};
