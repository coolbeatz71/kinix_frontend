import { FC } from 'react';
import { Lottie } from '@alfonmga/react-lottie-light-ts';
import { IUnknownObject } from '@interfaces/app';

interface ILottieAnimationProps {
    width: string;
    height: string;
    animation: IUnknownObject;
}

const LottieAnimation: FC<ILottieAnimationProps> = ({ width, height, animation }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return <Lottie config={defaultOptions} width={width} height={height} />;
};

export default LottieAnimation;
