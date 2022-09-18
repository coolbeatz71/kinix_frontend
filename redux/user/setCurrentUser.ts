import { userSlice } from '.';
import { AppDispatch } from '@redux/store';
import { ICurrentUser } from '@interfaces/user';

const setCurrentUserAction =
    (payload: ICurrentUser) =>
    (dispatch: AppDispatch): unknown => {
        return dispatch(userSlice.actions.currentUser({ ...payload }));
    };

export default setCurrentUserAction;
