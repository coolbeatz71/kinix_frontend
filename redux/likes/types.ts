import { IBasicInitialState, BasicInitialState } from '@constants/redux';

export type ILikesState = {
    add: IBasicInitialState;
    all: IBasicInitialState;
    user: IBasicInitialState;
    unlike: IBasicInitialState;
};

export const likesInitialState: ILikesState = {
    add: BasicInitialState,
    all: BasicInitialState,
    user: BasicInitialState,
    unlike: BasicInitialState,
};
