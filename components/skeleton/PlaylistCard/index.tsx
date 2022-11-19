import { FC } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Grid from 'antd/lib/grid';
import Skeleton from 'antd/lib/skeleton';

import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;

const PlaylistCardSkeleton: FC = () => {
    const { value } = useDarkLight();
    const { md } = useBreakpoint();

    return (
        <div data-theme={value} className={styles.playlistSkeleton}>
            <Card bordered={false}>
                <Row justify="space-between" gutter={md ? 24 : 12}>
                    <Col span={10} className={styles.playlistSkeleton__cover}>
                        <Skeleton.Image active />
                    </Col>
                    <Col span={14} className={styles.playlistSkeleton__body}>
                        <Row justify="space-between" gutter={[0, 12]}>
                            <Skeleton.Button active block size="small" />
                            {md && <Skeleton.Button active style={{ width: 200 }} size="small" />}
                        </Row>
                        <Row className={md ? 'mt-5' : 'mt-3'} gutter={[0, 12]} data-description align="middle">
                            <Col span={24}>
                                <Skeleton.Button className="d-flex align-items-end" style={{ width: 100 }} active />
                            </Col>
                            <Col span={24}>
                                <Skeleton.Button className="d-flex align-items-end" style={{ width: 150 }} active />
                            </Col>
                            <Col span={24}>
                                <Skeleton.Button className="d-flex align-items-end" style={{ width: 120 }} active />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default PlaylistCardSkeleton;
