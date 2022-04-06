import React, { FC } from 'react';
import { Col, Layout, Row, Typography, Anchor, Button, Form, Input, Divider, Space, Grid } from 'antd';
import useDarkLight from '@hooks/useDarkLight';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';

import styles from './index.module.scss';
import social from '@constants/social';
import FloatTextInput from '@components/common/TextInput';
import { APP_AUTHOR } from '@constants/platform';
import Link from 'next/link';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link: TextLink } = Typography;
const { Item } = Form;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

export interface IFooterProps {
    isSidenavClose: boolean;
}

const btnStyles = 'd-flex align-items-center justify-content-center';

export const Footer: FC<IFooterProps> = ({ isSidenavClose }) => {
    const { value, isDark } = useDarkLight();
    const { md } = useBreakpoint();

    return (
        <div className={styles.footer} data-theme={value}>
            <AntFooter className={styles.footer__content} data-sidenav-close={isSidenavClose}>
                <Row justify="space-between" data-row>
                    <Col xs={24} sm={24} md={10} className={styles.footer__content__address}>
                        <div>
                            <Title level={3} data-title>
                                Address
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
                                Follow us on social media to find out <br /> the latest updates on our progress
                            </Text>
                            <Row>
                                {social.map((item) => (
                                    <Button
                                        type="text"
                                        key={item.name}
                                        icon={item.icon}
                                        className={styles.footer__content__social__icon}
                                        onClick={() => window?.open(item.url, '_blank')}
                                    />
                                ))}
                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={14} className={styles.footer__content__contact}>
                        <Title level={3} data-title>
                            Contact Us
                        </Title>
                        <Form name="contact_us" layout="vertical" className={styles.footer__content__contact__form}>
                            <Item name="names">
                                <FloatTextInput label="Names" placeholder="First and Last name" required>
                                    <Input size="large" />
                                </FloatTextInput>
                            </Item>

                            <Item name="email">
                                <FloatTextInput label="Email" placeholder="Email Address" required>
                                    <Input size="large" />
                                </FloatTextInput>
                            </Item>

                            <Item name="message">
                                <TextArea size="large" placeholder="Type your message here" rows={4} autoSize={false} />
                            </Item>

                            <Button
                                block={!md}
                                size="large"
                                type={isDark ? 'default' : 'primary'}
                                className={`mt-2 ${btnStyles}`}
                            >
                                Send Message
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Divider />
                <Row justify="space-between" className={styles.footer__content__copyright}>
                    <Col xs={24} sm={24} md={12} data-copyright-container>
                        <Text data-copyright>© 2022 {APP_AUTHOR}. All rights reserved.</Text>
                    </Col>
                    <Col xs={24} sm={24} md={12} data-links>
                        <Space size={24} className={`d-flex ${md ? 'justify-content-end' : 'justify-content-between'}`}>
                            <Link href="">Terms of Service</Link>
                            <Link href="">Privacy Policies</Link>
                            <Link href="">Security</Link>
                        </Space>
                    </Col>
                </Row>
            </AntFooter>
        </div>
    );
};

export default Footer;
