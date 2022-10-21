export enum EnumVideoTabTitle {
    POPULAR = 'POPULAR',
    LYRICS = 'LYRICS',
}

export interface IVideoTab {
    title: EnumVideoTabTitle;
}

const videosTabs: IVideoTab[] = [
    {
        title: EnumVideoTabTitle.LYRICS,
    },
    {
        title: EnumVideoTabTitle.POPULAR,
    },
];

export default videosTabs;
