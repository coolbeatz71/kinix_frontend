import { BasicInitialStateList, IBasicInitialStateList } from 'constants/redux';

export type IStoryState = {
    all: IBasicInitialStateList;
};

export const storyInitialState: IStoryState = {
    all: BasicInitialStateList,
};
