import React, { FC } from 'react';
import { Button, Empty } from 'antd';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import styles from './index.module.scss';
import useDarkLight from '@hooks/useDarkLight';

export interface IEmptyDataProps {
    desc: string;
    hasButton?: boolean;
    buttonText?: string;
    buttonLink?: string;
    type: EnumEmptyDataType;
}

const EmptyData: FC<IEmptyDataProps> = ({ type, desc, hasButton = false, buttonText = '', buttonLink = '' }) => {
    const { value } = useDarkLight();

    const getImageUrl = (): string => {
        switch (type) {
            case EnumEmptyDataType.CONTENT:
                return '/feedback/empty-content.svg';
            case EnumEmptyDataType.SEARCH:
                return '/feedback/empty-search.svg';
            case EnumEmptyDataType.LYRICS:
                return '/feedback/empty-search.svg';
            default:
                return '/feedback/empty-search.svg';
        }
    };

    return (
        <Empty data-theme={value} image={getImageUrl()} className={styles.emptyData} description={<span>{desc}</span>}>
            {hasButton && (
                <Button type="primary" href={buttonLink}>
                    {buttonText}
                </Button>
            )}
        </Empty>
    );
};

export default EmptyData;
