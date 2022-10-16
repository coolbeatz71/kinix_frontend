import React, { FC } from 'react';
import { Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { isDark } from '@constants/colors';
import { useTranslation } from 'react-i18next';
import useDarkLight from '@hooks/useDarkLight';
import { EnumAuthContext } from '@constants/auth-context';
import { showAuthDialogAction } from '@redux/auth/showDialog';

const UserAuthSection: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { value } = useDarkLight();

    return (
        <Space>
            <Button
                ghost
                type={isDark(value) ? 'default' : 'primary'}
                onClick={() =>
                    showAuthDialogAction({
                        isOpen: true,
                        context: EnumAuthContext.LOGIN,
                    })(dispatch)
                }
            >
                {t('login')}
            </Button>
            <Button
                type={isDark(value) ? 'default' : 'primary'}
                onClick={() =>
                    showAuthDialogAction({
                        isOpen: true,
                        context: EnumAuthContext.SIGNUP,
                    })(dispatch)
                }
            >
                {t('signUp')}
            </Button>
        </Space>
    );
};

export default UserAuthSection;
