import { FC } from 'react';

import List from 'antd/lib/list';
import Skeleton from 'antd/lib/skeleton';

const ArticleCommentListSkeleton: FC = () => (
    <List>
        {Array.from(Array(4).keys()).map((i) => (
            <Skeleton className="mb-4" key={i} active avatar paragraph={{ rows: 2 }} />
        ))}
    </List>
);

export default ArticleCommentListSkeleton;
