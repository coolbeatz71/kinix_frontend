import React, { FC } from 'react';
import { Button, Space } from 'antd';
import socialList from '@constants/social';

interface ISocialButtonsProps {
    className: string;
}

const SocialButtons: FC<ISocialButtonsProps> = ({ className }) => {
    return (
        <Space>
            {socialList.map((social) => (
                <Button
                    type="text"
                    key={social.name}
                    icon={social.icon}
                    className={className}
                    data-platform={social.name}
                    onClick={() => window?.open(social.url, '_blank')}
                />
            ))}
        </Space>
    );
};

export default SocialButtons;
