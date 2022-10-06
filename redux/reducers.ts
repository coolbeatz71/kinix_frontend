import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import ads from './ads';
import articles from './articles';
import videos from './videos';
import ratings from './ratings';
import sharing from './sharing';

export const rootReducer = combineReducers({
    ads,
    user,
    auth,
    videos,
    articles,
    ratings,
    sharing,
});

export type IRootState = ReturnType<typeof rootReducer>;
