import { FC, useEffect, Fragment } from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { IUser } from '@interfaces/api';
import { IRootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import AvatarCard from '@components/cards/Avatar';
import getCurrentUserAction from '@redux/user/getCurrentUser';
import UpdateAccountForm from '@components/form/UpdateAccount';
import ChangePasswordForm from '@components/form/ChangePassword';

const SettingsContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { data: user, loading } = useSelector(({ user }: IRootState) => user?.currentUser);

    useEffect(() => {
        if (isEmpty(user)) dispatch(getCurrentUserAction());
    }, [dispatch, user]);

    return (
        <Fragment>
            <Row justify="space-between" gutter={24}>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <AvatarCard loading={loading} image={user?.image} userName={user?.userName} />
                    <ChangePasswordForm />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <UpdateAccountForm initialValues={user as IUser} />
                </Col>
            </Row>
        </Fragment>
    );
};

export default SettingsContainer;
