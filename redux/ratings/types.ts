import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IVideoRatingState = {
    add: IBasicInitialState;
    summary: IBasicInitialState;
    userRate: IBasicInitialStateList;
};

export const videoRatingInitialState: IVideoRatingState = {
    add: BasicInitialState,
    summary: BasicInitialState,
    userRate: BasicInitialStateList,
};
