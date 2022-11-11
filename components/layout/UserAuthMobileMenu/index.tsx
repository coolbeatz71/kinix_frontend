import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginOutlined, UserAddOutlined } from 'icons';

import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';

import { isDark } from '@constants/styles';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import { EnumAuthContext } from '@constants/auth-context';
import { showAuthDialogAction } from '@redux/auth/showDialog';

const { Item } = Menu;

export interface IUserAuthMobileMenuProps {
    className: string;
    openDropdown: boolean;
    setOpenDropdown: (v: boolean) => void;
}

const UserAuthMobileMenu: FC<IUserAuthMobileMenuProps> = ({ className, openDropdown, setOpenDropdown }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const dispatch = useAppDispatch();

    return (
        <Menu className={className} data-theme={value}>
            <Item key="login">
                <Button
                    ghost
                    block
                    icon={<LoginOutlined />}
                    type={isDark(value) ? 'default' : 'primary'}
                    onClick={() => {
                        setOpenDropdown(!openDropdown);
                        showAuthDialogAction({
                            isOpen: true,
                            context: EnumAuthContext.LOGIN,
                        })(dispatch);
                    }}
                >
                    {t('login')}
                </Button>
            </Item>
            <Item key="signup">
                <Button
                    block
                    icon={<UserAddOutlined />}
                    type={isDark(value) ? 'default' : 'primary'}
                    onClick={() => {
                        setOpenDropdown(!openDropdown);
                        showAuthDialogAction({
                            isOpen: true,
                            context: EnumAuthContext.SIGNUP,
                        })(dispatch);
                    }}
                >
                    {t('signUp')}
                </Button>
            </Item>
        </Menu>
    );
};

export default UserAuthMobileMenu;
