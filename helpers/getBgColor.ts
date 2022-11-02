import ColorHash from 'color-hash';

export const getBgColor = (name: string): string => new ColorHash().hex(name || '');
