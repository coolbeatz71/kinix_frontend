import { FC } from 'react';

import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';

import useDarkLight from '@hooks/useDarkLight';
import { EnumAlaUnePriority } from '@constants/alaune-article';

import styles from './index.module.scss';

const AlaUneCardSkeleton: FC<{ priority: EnumAlaUnePriority }> = ({ priority }) => {
    const { value } = useDarkLight();

    return (
        <div data-theme={value} className={styles.alaUneSkeleton}>
            <Card data-priority={priority} bordered={false}>
                <Row justify="space-between" gutter={48} className="mb-4">
                    <Col span={12}>
                        <Skeleton.Button active block size="small" />
                    </Col>
                    <Col span={6}>
                        <Skeleton.Button active block size="small" />
                    </Col>
                </Row>
                <Row className="mb-4" align="middle">
                    <Col span={24}>
                        {priority === EnumAlaUnePriority.FIRST ? (
                            <div className={styles.alaUneSkeleton__title} />
                        ) : (
                            <Skeleton.Image active className={styles.alaUneSkeleton__cover} />
                        )}
                    </Col>
                </Row>
                <Row justify="space-between" className="mb-4">
                    <Skeleton
                        title
                        active
                        paragraph={{
                            rows: 2,
                        }}
                    />
                </Row>
                <Skeleton.Button size="large" active />
            </Card>
        </div>
    );
};

export default AlaUneCardSkeleton;
