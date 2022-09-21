import { BasicInitialStateList, IBasicInitialStateList } from 'constants/redux';

export type IAdsState = {
    all: IBasicInitialStateList;
};

export const adsInitialState: IAdsState = {
    all: BasicInitialStateList,
};
