import { BasicInitialState, IBasicInitialState } from 'constants/redux';

export type ISearchState = {
    all: IBasicInitialState;
};

export const searchInitialState: ISearchState = {
    all: BasicInitialState,
};
