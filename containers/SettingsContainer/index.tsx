import React, { FC, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { IUser } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import useDarkLight from '@hooks/useDarkLight';
import getCurrentUserAction from '@redux/user/getCurrentUser';
import UpdateAccountForm from '@components/form/UpdateAccount';
import ChangePasswordForm from '@components/form/ChangePassword';

import styles from './index.module.scss';

const SettingsContainer: FC = () => {
    const { value } = useDarkLight();

    const dispatch = useAppDispatch();
    const { data: user } = useSelector(({ user }: IRootState) => user?.currentUser);

    useEffect(() => {
        dispatch(getCurrentUserAction());
    }, [dispatch]);

    return (
        <div data-theme={value} className={styles.settings}>
            <Row justify="space-between" gutter={24}>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <ChangePasswordForm />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <UpdateAccountForm initialValues={user as IUser} />
                </Col>
            </Row>
        </div>
    );
};

export default SettingsContainer;
