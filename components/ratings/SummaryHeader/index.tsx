import { FC } from 'react';
import numeral from 'numeral';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import IRateSummary from '@interfaces/rates';

export interface ISummaryHeaderProps {
    ratings: IRateSummary;
}

const SummaryHeader: FC<ISummaryHeaderProps> = ({ ratings }) => {
    return (
        <Row align="middle" justify="space-between" className="mb-2">
            <Col className="d-flex align-items-end">
                <strong data-total-rate>{ratings.avgRate.toFixed(1)}</strong>
                <span data-total-count>/5</span>
            </Col>
            <Col>
                total: <strong>{numeral(Number(ratings.total)).format('0.[00]a')}</strong>
            </Col>
        </Row>
    );
};

export default SummaryHeader;
