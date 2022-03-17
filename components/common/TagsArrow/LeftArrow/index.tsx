import React, { FC, useContext, useEffect, useState } from 'react';
import { CaretLeftOutlined } from '@ant-design/icons';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import ArrowButton from '../ArrowButton';
import { EnumTagArrowPlacement } from '@constants/tag-arrow-placement';

export const LeftArrow: FC = () => {
    const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } =
        useContext(VisibilityContext);
    const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));

    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) setDisabled(isFirstItemVisible);
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

    return (
        <ArrowButton
            disabled={disabled}
            onClick={() => scrollPrev()}
            icon={<CaretLeftOutlined />}
            placement={EnumTagArrowPlacement.LEFT}
        />
    );
};
