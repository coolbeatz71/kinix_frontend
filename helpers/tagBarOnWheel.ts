import { ContextType } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

export const getId = (index: number): string => `${index}`;

const onWheel = (apiObj: scrollVisibilityApiType, e: React.WheelEvent): void => {
    const isThouchpad = Math.abs(e.deltaX) !== 0 || Math.abs(e.deltaY) < 15;

    if (isThouchpad) {
        e.stopPropagation();
        return;
    }

    if (e.deltaY < 0) apiObj.scrollNext();
    else if (e.deltaY > 0) apiObj.scrollPrev();
};

export default onWheel;
