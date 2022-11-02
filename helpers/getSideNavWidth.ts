import { MAX_SIDENAV_WIDTH, MIN_SIDENAV_WIDTH } from '@constants/sidenav-section';

const getSideNavWidth = (open: boolean, collapsed: boolean): number => {
    if (open && !collapsed) return MAX_SIDENAV_WIDTH;
    if (open && collapsed) return MIN_SIDENAV_WIDTH;

    return 0;
};

export default getSideNavWidth;
