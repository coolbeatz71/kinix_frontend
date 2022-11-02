import { EnumAuthContext } from '@constants/auth-context';
import { showAuthDialogAction } from '@redux/auth/showDialog';
import { AppDispatch } from '@redux/store';
import { TFunction } from 'react-i18next';
import getNotification from './getNotification';

const showAuthRequired = (t: TFunction<'translation', undefined>, dispatch: AppDispatch): void => {
    getNotification('error', t('authRequired'));
    showAuthDialogAction({
        isOpen: true,
        context: EnumAuthContext.LOGIN,
    })(dispatch);
};

export default showAuthRequired;
