import { FC } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Grid from 'antd/lib/grid';
import Space from 'antd/lib/space';
import Layout from 'antd/lib/layout';
import Anchor from 'antd/lib/anchor';
import Divider from 'antd/lib/divider';
import Typography from 'antd/lib/typography';

import useDarkLight from '@hooks/useDarkLight';
import { APP_AUTHOR } from '@constants/platform';
import ContactUsForm from '@components/form/ContactUs';
import SocialButtons from '@components/common/SocialButtons';

import styles from './index.module.scss';

const { useBreakpoint } = Grid;
const { Footer: AntFooter } = Layout;
const { Title, Text, Link: TextLink } = Typography;

export interface IFooterProps {
    isSidenavClose: boolean;
}

export const Footer: FC<IFooterProps> = ({ isSidenavClose }) => {
    const { t } = useTranslation();
    const { value } = useDarkLight();
    const { md, lg } = useBreakpoint();

    return (
        <div className={styles.footer} data-theme={value}>
            <AntFooter className={styles.footer__content} data-sidenav-close={isSidenavClose}>
                <Row justify="space-between" data-row>
                    <Col xs={24} sm={24} md={12} lg={10} className={styles.footer__content__address}>
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
                    <Col xs={24} sm={24} md={12} lg={14} className={styles.footer__content__contact}>
                        <ContactUsForm className={styles.footer__content__contact__form} />
                    </Col>
                </Row>
                <Divider />
                <Row justify="space-between" className={styles.footer__content__copyright}>
                    <Col xs={24} sm={24} md={12} lg={12} data-copyright-container>
                        <Text data-copyright>
                            © 2022 {APP_AUTHOR}. {t('allRightReserved')}
                        </Text>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} data-links>
                        <Space
                            size={md && !lg ? 16 : 24}
                            className={`d-flex ${md ? 'justify-content-end' : 'justify-content-between'}`}
                        >
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
