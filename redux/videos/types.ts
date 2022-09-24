import { BasicInitialStateList, IBasicInitialStateList } from 'constants/redux';

export type IVideosState = {
    feed: IBasicInitialStateList;
};

export const videosInitialState: IVideosState = {
    feed: BasicInitialStateList,
};
