import { BasicInitialStateList, IBasicInitialStateList } from 'constants/redux';

export type IArticlesState = {
    tags: IBasicInitialStateList;
    featured: IBasicInitialStateList;
};

export const articlesInitialState: IArticlesState = {
    tags: BasicInitialStateList,
    featured: BasicInitialStateList,
};
