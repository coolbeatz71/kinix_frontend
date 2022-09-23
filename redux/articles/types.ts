import { BasicInitialStateList, IBasicInitialStateList } from 'constants/redux';

export type IArticlesState = {
    featured: IBasicInitialStateList;
};

export const articlesInitialState: IArticlesState = {
    featured: BasicInitialStateList,
};
