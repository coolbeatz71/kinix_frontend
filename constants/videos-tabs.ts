export enum ETabTitle {
    POPULAR = 'POPULAR',
    RATINGS = 'RATINGS',
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
        title: ETabTitle.RATINGS,
    },
    {
        title: ETabTitle.LYRICS,
    },
];

export default videosTabs;
