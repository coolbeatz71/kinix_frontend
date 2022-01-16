import React, { Fragment, FC } from 'react';
import HomeIllustration from '@components/Home/MainIllustration';
import HomeSection from '@components/Home/Section';
import { BulbFilled } from '@ant-design/icons';

const HomeContainer: FC = () => {
    return (
        <Fragment>
            <HomeIllustration />
            <HomeSection
                fetched
                title="Discovery"
                icon={<BulbFilled />}
                error={null}
                data={[]}
                linkHasMore="/videos?"
            />
        </Fragment>
    );
};

export default HomeContainer;
