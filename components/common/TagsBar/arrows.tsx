import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';

export interface IArrowProps {
    icon: ReactNode;
    disabled: boolean;
    onClick: VoidFunction;
}

const Arrow: FC<IArrowProps> = ({ children, disabled, onClick, icon }) => (
    <Button
        icon={icon}
        onClick={() => {
            console.log('clicked');
            onClick();
        }}
        disabled={disabled}
        style={{
            display: disabled ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: disabled ? '0' : '1',
            userSelect: 'none',
        }}
    >
        {children}
    </Button>
);

export const LeftArrow: FC = () => {
    const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } =
        useContext(VisibilityContext);
    const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));

    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

    return <Arrow disabled={disabled} onClick={() => scrollPrev()} icon={<CaretLeftOutlined />} />;
};

export const RightArrow: FC = () => {
    const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = useContext(VisibilityContext);
    const [disabled, setDisabled] = useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);

    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);

    return <Arrow disabled={disabled} onClick={() => scrollNext()} icon={<CaretRightOutlined />} />;
};
