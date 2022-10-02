import { BasicInitialState, BasicInitialStateList, IBasicInitialState, IBasicInitialStateList } from 'constants/redux';

export type IArticlesState = {
    all: IBasicInitialState;
    tags: IBasicInitialStateList;
    featured: IBasicInitialStateList;
};

export const articlesInitialState: IArticlesState = {
    all: BasicInitialState,
    tags: BasicInitialStateList,
    featured: BasicInitialStateList,
};
