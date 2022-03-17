import React, { FC, useContext, useEffect, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import ArrowButton from '../ArrowButton';
import { EnumTagArrowPlacement } from '@constants/tag-arrow-placement';

export const RightArrow: FC = () => {
    const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = useContext(VisibilityContext);
    const [disabled, setDisabled] = useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);

    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) setDisabled(isLastItemVisible);
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);

    return (
        <ArrowButton
            disabled={disabled}
            onClick={() => scrollNext()}
            icon={<CaretRightOutlined />}
            placement={EnumTagArrowPlacement.RIGHT}
        />
    );
};
