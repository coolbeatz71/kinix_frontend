import { IBasicInitialState, BasicInitialState } from '@constants/redux';

export type IBookmarksState = {
    add: IBasicInitialState;
    all: IBasicInitialState;
    user: IBasicInitialState;
    delete: IBasicInitialState;
};

export const bookmarksInitialState: IBookmarksState = {
    add: BasicInitialState,
    all: BasicInitialState,
    user: BasicInitialState,
    delete: BasicInitialState,
};
