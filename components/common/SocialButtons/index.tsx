import { FC } from 'react';

import Space from 'antd/lib/space';
import Button from 'antd/lib/button';

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
