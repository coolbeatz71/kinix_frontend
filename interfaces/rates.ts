interface IRateSummary {
    total: number;
    rated: boolean;
    avgRate: number;
    summary: { value: number; count: number }[];
}

export default IRateSummary;
