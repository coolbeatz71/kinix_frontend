import { FC } from 'react';
import numeral from 'numeral';
import { StarFilled } from 'icons';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Progress from 'antd/lib/progress';

import { PRIMARY } from '@constants/styles';

export interface ISummaryBodyProps {
    percent: string;
    rate: {
        value: number;
        count: number;
    };
}

const SummaryBody: FC<ISummaryBodyProps> = ({ rate, percent }) => (
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

export default SummaryBody;
