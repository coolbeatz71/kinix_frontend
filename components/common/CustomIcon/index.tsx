import React, { FC } from 'react';
import Icon from '@ant-design/icons';

import HamburgerMenuSvg from './svg/hamburger-menu';
import LikedHeartSvg from './svg/liked-heart';
import { IUnknownObject } from 'interfaces/app';
import { CustomIconComponentProps } from 'interfaces/icon';

const icons: IUnknownObject = {
    'hamburger-menu': HamburgerMenuSvg,
    'liked-heart': LikedHeartSvg,
};

interface Props {
    type: string;
}

const CustomIcon: FC<Props & CustomIconComponentProps> = ({ type, ...props }) => (
    <Icon component={icons[type]} {...props} />
);

export default CustomIcon;
