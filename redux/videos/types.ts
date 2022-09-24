import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IVideosState = {
    feed: IBasicInitialState;
};

export const videosInitialState: IVideosState = {
    feed: BasicInitialState,
};
