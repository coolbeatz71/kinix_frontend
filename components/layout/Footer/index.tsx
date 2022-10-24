import React, { FC } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { Col, Layout, Row, Typography, Anchor, Button, Form, Input, Divider, Space, Grid } from 'antd';
import { BTN_STYLES } from '@constants/styles';
import useDarkLight from '@hooks/useDarkLight';
import { APP_AUTHOR } from '@constants/platform';
import FloatTextInput from '@components/common/TextInput';
import SocialButtons from '@components/common/SocialButtons';

import styles from './index.module.scss';

const { Item } = Form;
const { TextArea } = Input;
const { useBreakpoint } = Grid;
const { Footer: AntFooter } = Layout;
const { Title, Text, Link: TextLink } = Typography;

export interface IFooterProps {
    isSidenavClose: boolean;
}

export const Footer: FC<IFooterProps> = ({ isSidenavClose }) => {
    const { md } = useBreakpoint();
    const { t } = useTranslation();
    const { value, isDark } = useDarkLight();

    return (
        <div className={styles.footer} data-theme={value}>
            <AntFooter className={styles.footer__content} data-sidenav-close={isSidenavClose}>
                <Row justify="space-between" data-row>
                    <Col xs={24} sm={24} md={10} className={styles.footer__content__address}>
                        <div>
                            <Title level={3} data-title>
                                {t('address')}
                            </Title>
                            <Anchor affix={false}>
                                <div className={styles.footer__content__address__value}>
                                    <Text data-contact-address>
                                        <MdLocationOn />
                                        &nbsp; 151 New Park Ave, KN 134 St, Kigali/Rwanda
                                    </Text>

                                    <TextLink data-contact-address href="tel:(+250) 078 071 2761">
                                        <MdPhone />
                                        &nbsp; (+250) 078 07 12 761
                                    </TextLink>

                                    <TextLink data-contact-address href="mailto:sigmacool@gmail.com" target="_blank">
                                        <MdEmail />
                                        &nbsp; sigmacool@gmail.com
                                    </TextLink>
                                </div>
                            </Anchor>
                        </div>
                        <div className={styles.footer__content__social}>
                            <Text data-contact-address>
                                {t('followUsOne')} <br /> {t('followUsTwo')}
                            </Text>
                            <Row>
                                <SocialButtons className={styles.footer__content__social__icon} />
                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={14} className={styles.footer__content__contact}>
                        <Title level={3} data-title>
                            {t('contactUs')}
                        </Title>
                        <Form name="contact_us" layout="vertical" className={styles.footer__content__contact__form}>
                            <Item name="names">
                                <FloatTextInput label={t('names')} placeholder={t('firstLastName')} required>
                                    <Input size="large" />
                                </FloatTextInput>
                            </Item>

                            <Item name="email">
                                <FloatTextInput label="Email" placeholder={t('email')} required>
                                    <Input size="large" />
                                </FloatTextInput>
                            </Item>

                            <Item name="message">
                                <TextArea size="large" placeholder={t('writeMessageHere')} rows={4} autoSize={false} />
                            </Item>

                            <Button
                                block={!md}
                                size="large"
                                className={`mt-2 ${BTN_STYLES}`}
                                type={isDark ? 'default' : 'primary'}
                            >
                                {t('sendMessage')}
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Divider />
                <Row justify="space-between" className={styles.footer__content__copyright}>
                    <Col xs={24} sm={24} md={12} data-copyright-container>
                        <Text data-copyright>
                            © 2022 {APP_AUTHOR}. {t('allRightReserved')}
                        </Text>
                    </Col>
                    <Col xs={24} sm={24} md={12} data-links>
                        <Space size={24} className={`d-flex ${md ? 'justify-content-end' : 'justify-content-between'}`}>
                            <Link href="">{t('termsOfService')}</Link>
                            <Link href="">{t('privacyPolicies')}</Link>
                            <Link href="">{t('security')}</Link>
                        </Space>
                    </Col>
                </Row>
            </AntFooter>
        </div>
    );
};

export default Footer;
