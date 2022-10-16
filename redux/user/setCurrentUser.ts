import { userSlice } from '.';
import { AppDispatch } from '@redux/store';
import { IUnknownObject } from '@interfaces/app';

const setCurrentUserAction =
    (payload: IUnknownObject) =>
    (dispatch: AppDispatch): unknown => {
        return dispatch(userSlice.actions.currentUser({ ...payload }));
    };

export default setCurrentUserAction;
