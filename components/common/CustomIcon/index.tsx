import React, { FC } from 'react';
import Icon from '@ant-design/icons';

import hamburgerMenu from './svg/hamburger-menu';
import { IUnknownObject } from 'type/app';
import { CustomIconComponentProps } from '@type/icon';

const icons: IUnknownObject = {
    'hamburger-menu': hamburgerMenu,
};

interface Props {
    type: string;
}

const CustomIcon: FC<Props & CustomIconComponentProps> = ({ type, ...props }) => (
    <Icon component={icons[type]} {...props} />
);

export default CustomIcon;
