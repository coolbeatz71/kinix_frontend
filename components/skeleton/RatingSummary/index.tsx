import React, { FC } from 'react';
import { Skeleton } from 'antd';

const RatingSummarySkeleton: FC = () => (
    <div className="d-flex flex-column">
        {Array.from(Array(4).keys()).map((item) => (
            <Skeleton.Button className="mb-1" key={item} active size="small" block />
        ))}
    </div>
);

export default RatingSummarySkeleton;
