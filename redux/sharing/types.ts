import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type IVideoSharingState = {
    add: IBasicInitialState;
    all: IBasicInitialState;
};

export const videoSharingInitialState: IVideoSharingState = {
    add: BasicInitialState,
    all: BasicInitialState,
};
