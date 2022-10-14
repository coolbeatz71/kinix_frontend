import { IUnknownObject } from '@interfaces/app';
import { AppDispatch } from '@redux/store';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/axios';
import { commentsSlice } from '.';

export const resetDeleteArticleCommentAction =
    () =>
    (dispatch: AppDispatch): AnyAction => {
        return dispatch(commentsSlice.actions.clear({ context: 'comments/delete' }));
    };

const deleteArticleCommentAction = createAsyncThunk(
    'comments/delete',
    async (params: { id: number; slug: string }, { rejectWithValue }) => {
        const { slug, id } = params;

        try {
            const response: IUnknownObject = await api.delete(`/comments/${slug}/${id}`);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export default deleteArticleCommentAction;
