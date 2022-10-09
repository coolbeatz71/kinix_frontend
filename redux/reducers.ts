import { combineReducers } from 'redux';
import ads from './ads';
import user from './user';
import auth from './auth';
import likes from './likes';
import videos from './videos';
import ratings from './ratings';
import sharing from './sharing';
import articles from './articles';
import comments from './comments';

export const rootReducer = combineReducers({
    ads,
    user,
    auth,
    likes,
    videos,
    sharing,
    ratings,
    articles,
    comments,
});

export type IRootState = ReturnType<typeof rootReducer>;
