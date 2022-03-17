import React, { FC, ReactNode } from 'react';
import { Button } from 'antd';
import { EnumTagArrowPlacement } from '@constants/tag-arrow-placement';

import styles from './index.module.scss';

export interface IArrowProps {
    icon: ReactNode;
    disabled: boolean;
    onClick: VoidFunction;
    placement: EnumTagArrowPlacement;
}

const ArrowButton: FC<IArrowProps> = ({ children, disabled, onClick, icon, placement }) => {
    const display = disabled ? 'none' : 'flex';
    const opacity = disabled ? '0' : '1';

    return (
        <div
            data-placement={placement}
            className={styles.arrowButton}
            style={{
                display,
                opacity,
            }}
        >
            <Button
                type="text"
                icon={icon}
                onClick={onClick}
                disabled={disabled}
                style={{
                    display,
                    opacity,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    userSelect: 'none',
                }}
            >
                {children}
            </Button>
        </div>
    );
};

export default ArrowButton;
