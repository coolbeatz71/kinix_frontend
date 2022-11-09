import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { FormInstance } from 'antd/lib/form/Form';

import { IComment } from '@interfaces/api';
import { commentValidator } from './validators';
import { ICommentData } from '@interfaces/comments';
import { EnumFormContext, IUnknownObject } from '@interfaces/app';

const DynamicErrorAlert = dynamic(() => import('@components/common/ErrorAlert'));

const { Item } = Form;
const { TextArea } = Input;

export interface ICreateArticleCommentProps {
    loading: boolean;
    initialValues?: IComment;
    formContext: EnumFormContext;
    formRef: FormInstance<ICommentData>;
    error: Error | IUnknownObject | null;
    onSubmit: (val: ICommentData) => void;
}

const CreateArticleComment: FC<ICreateArticleCommentProps> = ({ loading, error, formRef, initialValues, onSubmit }) => {
    const { t } = useTranslation();
    const textAreaStyle = { height: 80 };

    return (
        <Form
            size="large"
            form={formRef}
            layout="vertical"
            onFinish={onSubmit}
            name="create_comment"
            initialValues={initialValues}
        >
            <Item
                name="body"
                label={t('comment')}
                rules={commentValidator(t('comment'))}
                validateTrigger={['onSubmit', 'onBlur']}
            >
                <TextArea autoSize={false} style={textAreaStyle} placeholder={t('addComment')} />
            </Item>

            <DynamicErrorAlert error={error} closable banner showIcon />

            <div className="d-flex justify-content-end">
                <Button htmlType="submit" type="primary" size="middle" loading={loading} disabled={loading}>
                    {t('commentBtn')}
                </Button>
            </div>
        </Form>
    );
};

export default CreateArticleComment;
