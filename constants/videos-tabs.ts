export enum ETabTitle {
    POPULAR = 'POPULAR',
    LYRICS = 'LYRICS',
}

export interface IVideoTab {
    title: ETabTitle;
}

const videosTabs: IVideoTab[] = [
    {
        title: ETabTitle.POPULAR,
    },
    {
        title: ETabTitle.LYRICS,
    },
];

export default videosTabs;
