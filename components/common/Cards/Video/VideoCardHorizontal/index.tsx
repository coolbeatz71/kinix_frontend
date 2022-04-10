import React, { FC, useEffect, useState } from 'react';
import useDarkLight from '@hooks/useDarkLight';
import { Button, Card, Col, Grid, Row, Typography } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';
import { isBoolean, truncate } from 'lodash';

import styles from './index.module.scss';
import { WARNING } from '@constants/colors';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export interface IVideoCardHorinzontalProps {
    size?: number;
}

const title = "We Takin' Over - Dj Khaled Ft. T.I, Akon, Rick Ross, Fat Joe, Birdman & Lil Wayne";
const channel = 'Derrière La Caméra';

const VideoCardHorinzontal: FC<IVideoCardHorinzontalProps> = () => {
    const { value } = useDarkLight();
    const { lg } = useBreakpoint();

    const [showOverLay, setShowOverLay] = useState<boolean>(false);
    const overLayStyles = showOverLay ? { opacity: 1 } : { opacity: 0 };

    const handleShowOverlay = (): void => {
        if (lg) setShowOverLay(!showOverLay);
        else setShowOverLay(true);
    };

    useEffect(() => {
        if (isBoolean(lg) && !lg) setShowOverLay(true);
    }, [lg]);

    return (
        <div
            data-theme={value}
            className={styles.videoCardHorinzontal}
            onMouseEnter={handleShowOverlay}
            onMouseLeave={handleShowOverlay}
        >
            <Card bordered={false} hoverable>
                <Row justify="space-between">
                    <Col span={9} className={styles.videoCardHorinzontal__cover}>
                        <div className="overlay" style={overLayStyles}>
                            <Button
                                icon={<PlayCircleTwoTone twoToneColor={WARNING} />}
                                shape="circle"
                                type="text"
                                size="large"
                            />
                        </div>
                        <img src="https://picsum.photos/1024/512?random" alt="" />
                    </Col>
                    <Col span={15} data-body>
                        <Title level={5} data-title>
                            {truncate(title, {
                                length: 60,
                            })}
                        </Title>
                        <div className="d-flex flex-column">
                            <Text data-channel>
                                {truncate(channel, {
                                    length: 20,
                                })}
                            </Text>
                            <Text data-subscribers>87.5K subscribers</Text>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default VideoCardHorinzontal;
