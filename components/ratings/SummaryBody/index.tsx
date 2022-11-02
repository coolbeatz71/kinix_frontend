import React, { FC } from 'react';
import numeral from 'numeral';
import { Row, Col, Progress } from 'antd';
import { PRIMARY } from '@constants/styles';
import { StarFilled } from 'icons';

export interface ISummaryBodyProps {
    percent: string;
    rate: {
        value: number;
        count: number;
    };
}

const SummaryBody: FC<ISummaryBodyProps> = ({ rate, percent }) => {
    return (
        <Row align="middle" justify="space-between">
            <Col className="d-flex align-items-center me-3">
                <StarFilled data-star />
                <strong className="ms-1">{rate.value}</strong>
            </Col>
            <Col flex={2} className="d-flex justify-content-between">
                <Progress
                    status="active"
                    showInfo={false}
                    trailColor="#ddd"
                    strokeColor={PRIMARY}
                    percent={Number(percent)}
                />
                <span className="ms-2">{numeral(Number(rate.count)).format('0.[00]a')}</span>
            </Col>
        </Row>
    );
};

export default SummaryBody;
