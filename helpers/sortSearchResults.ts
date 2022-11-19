import dayjs from 'dayjs';
import { IArticle, IVideo } from '@interfaces/api';

const sortSearchResults = (data: (IArticle | IVideo)[]): (IArticle | IVideo)[] => {
    return data.sort((a, b) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1));
};

export default sortSearchResults;
