export enum ETabTitle {
    POPULAR = 'POPULAR',
    LYRICS = 'LYRICS',
}

export interface IVideoTab {
    title: ETabTitle;
}

const videosTabs: IVideoTab[] = [
    {
        title: ETabTitle.LYRICS,
    },
    {
        title: ETabTitle.POPULAR,
    },
];

export default videosTabs;
