import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IVideosState = {
    all: IBasicInitialState;
    feed: IBasicInitialState;
    youtube: IBasicInitialState;
    tags: IBasicInitialStateList;
    popular: IBasicInitialStateList;
    related: IBasicInitialStateList;
};

export const videosInitialState: IVideosState = {
    all: BasicInitialState,
    feed: BasicInitialState,
    youtube: BasicInitialState,
    tags: BasicInitialStateList,
    popular: BasicInitialStateList,
    related: BasicInitialStateList,
};
