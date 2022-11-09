import { FC, ReactNode } from 'react';

import Button from 'antd/lib/button';

import { EnumTagArrowPlacement } from '@constants/tag-arrow-placement';

import styles from './index.module.scss';

export interface IArrowProps {
    icon: ReactNode;
    disabled: boolean;
    onClick: VoidFunction;
    placement: EnumTagArrowPlacement;
}

const ArrowButton: FC<IArrowProps> = ({ children, disabled, onClick, icon, placement }) => {
    const opacity = disabled ? '0' : '1';
    const display = disabled ? 'none' : 'flex';

    return (
        <div
            style={{
                display,
                opacity,
            }}
            data-placement={placement}
            className={styles.arrowButton}
        >
            <Button
                type="text"
                icon={icon}
                onClick={onClick}
                disabled={disabled}
                style={{
                    display,
                    opacity,
                    userSelect: 'none',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {children}
            </Button>
        </div>
    );
};

export default ArrowButton;
