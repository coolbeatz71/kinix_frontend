import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IVideoSharingState = {
    add: IBasicInitialState;
    all: IBasicInitialState;
    userShares: IBasicInitialState;
};

export const videoSharingInitialState: IVideoSharingState = {
    add: BasicInitialState,
    all: BasicInitialState,
    userShares: BasicInitialState,
};
