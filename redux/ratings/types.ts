import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IVideoRatingState = {
    add: IBasicInitialState;
    summary: IBasicInitialState;
    userRates: IBasicInitialState;
    single: IBasicInitialStateList;
};

export const videoRatingInitialState: IVideoRatingState = {
    add: BasicInitialState,
    summary: BasicInitialState,
    userRates: BasicInitialState,
    single: BasicInitialStateList,
};
