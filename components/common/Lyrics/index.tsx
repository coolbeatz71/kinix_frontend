import React, { FC } from 'react';
import { Col, Row } from 'antd';
import EmptyData from '../EmptyData';
import { EnumEmptyDataType } from '@constants/empty-data-type';
import useDarkLight from '@hooks/useDarkLight';

import styles from './index.module.scss';

export interface ILyricsProps {
    content: string;
}

const contentText = `Oww! Uh-huh
No homo, Young Moolah baby
I said he's so sweet, make her wanna lick the wrapper
So I let her lick the rapper

She, she, she licked me like a lollipop
She, she licked me like a lollipop
She, she, she licked me like a lollipop
She, she licked me like a lollipop

Shawty want a thug
Bottles in the club
Shawty wanna hump
You know I love to touch ya lovely lady lumps
Shawty wanna thug
Bottles in the club
Shawty wanna hump
You know I love to touch ya lovely lady lumps

Okay, lil mama had a swag like mine
She even wear her hair down her back like mine
I make her feel right when it's wrong like lyin'
Man, she ain't never had a love like mine
But man, I ain't never seen an ass like hers
That pussy in my mouth had me lost for words
So I told her back it up like, "burp, burp"
And made that ass jump like, "jerp, jerp"
And that's when she

She, she, she licked me like a lollipop (oh yeah I like that)
She, she licked me like a lollipop (oh yeah I like that)
She, she, she licked me like a lollipop (I like that)
She, she licked me like a lollipop

Shawty want a thug
Bottles in the club
Shawty wanna hump
You know I love to touch ya lovely lady lumps
Shawty wanna thug
Bottles in the club
Shawty wanna hump
You know I love to touch ya lovely lady lumps

Now get up after you back it up, don't stop
Drop it, shawty, drop it like it's hot
Ooh, drop it like it's hot
Do it, shawty, don't stop
Shawty say the nigga that she with ain't shit
Shawty say the nigga that she with ain't this
Shawty say the nigga that she with can't hit
But, shawty, I'ma hit it, hit it like I can't miss
And "he can't do this, " and "he don't do that!"
Shawty need a refund, need to bring that nigga back
Just like a refund, I make her bring that ass back
And she bring that ass back, because I like that
Shawty want a thug
Bottles in the club
Shawty wanna hump
You know I love to touch ya lovely lady lumps
Shawty wanna lick, lick, lick, lick, lick me like a lollipop
Shawty wanna lick, lick, lick, lick, lick me like a lollipop
Shawty wanna lick me like a lollipop
So I let her lick the rapper like a lollipop
Shawty want a thug
Bottles in the club
Shawty wanna hump
You know I love to touch ya lovely lady lumps
Stat!
Call me, so I can make it juicy for ya
Call me, so I can get it juicy for ya
Call me, so I can make it juicy for ya
Call me, so I can get it juicy for ya
Call me, so I can make it juicy for ya
Call me, so I can get it juicy for ya
Call me, so I can make it juicy for ya
Call me, so I can get it juicy for ya
Shawty want a thug
Bottles in the club
Shawty wanna hump
You know I love to touch ya lovely lady lumps

Shawty want a thug
Bottles in the club
Shawty wanna hump
You know I love to touch ya lovely lady lumps
I get her on top, she drop it like it's hot
And when I'm at the bottom, she Hillary Rodham
The middle of the bed, givin', gettin' head
Givin', gettin' head, givin', gettin' head
I said hmm, I like that
Said hmm, yeah, I like that
I said hmm, yeah, I like that, hmm

Call me, so I can come and do it for ya
Call me, so I can come and prove it for ya
Call me, so I can make it juicy for ya
Call me, so I can get it juicy for ya

Shawty wanna lick, lick, lick, lick, lick me like a lollipop
She, she licked me like a lollipop
I said he's so sweet, make her wanna lick the wrapper
(What you do?) So I let her lick the rapper`;

const Lyrics: FC<ILyricsProps> = ({ content }) => {
    const { value } = useDarkLight();

    return content ? (
        <EmptyData type={EnumEmptyDataType.LYRICS} desc={'No lyrics was uploaded in this video'} />
    ) : (
        <Row data-theme={value} className={styles.lyrics}>
            <Col sm={24} md={24} lg={12}>
                <div data-text dangerouslySetInnerHTML={{ __html: contentText }} />
            </Col>
        </Row>
    );
};

export default Lyrics;
