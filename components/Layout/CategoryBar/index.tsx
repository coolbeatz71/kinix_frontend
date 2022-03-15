import React, { FC } from 'react';
import { CatType } from '@context/video-categories';
import { ALL_VIDEOS_PATH } from '@constants/paths';
import { Row } from 'antd';

export interface ICategoryBarProps {
    categories: CatType[];
    baseUrl?: string;
    scrolled: string;
}

const CategoryBar: FC<ICategoryBarProps> = ({
    categories: _cat,
    baseUrl: _baseUrl = ALL_VIDEOS_PATH,
    scrolled: _scroll,
}) => {
    return <Row gutter={24} align="middle"></Row>;
};

export default CategoryBar;
