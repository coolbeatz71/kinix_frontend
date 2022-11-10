import { FC } from 'react';
import Icon from '@ant-design/icons';

import HamburgerMenuSvg from './svg/hamburger-menu';
import LikedHeartSvg from './svg/liked-heart';
import FrenchFlagSvg from './svg/french-flag';
import EnglishFlagSvg from './svg/english-flag';
import { IUnknownObject } from 'interfaces/app';
import { CustomIconComponentProps } from 'interfaces/icon';

const icons: IUnknownObject = {
    'hamburger-menu': HamburgerMenuSvg,
    'liked-heart': LikedHeartSvg,
    'french-flag': FrenchFlagSvg,
    'english-flag': EnglishFlagSvg,
};

interface Props {
    type: string;
}

const CustomIcon: FC<Props & CustomIconComponentProps> = ({ type, ...props }) => (
    <Icon component={icons[type]} {...props} />
);

export default CustomIcon;
