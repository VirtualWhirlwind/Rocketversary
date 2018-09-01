export interface SpaceEvent {
    name: string;
    subtitle: string;
    country: string;
    date: Date;
    url: string;
    description: string;
    year: number;
    month: number;
    day: number;
    genericDate: string;
    convenienceDate: Date;
}

export interface SpaceEventGroup {
    previous?: SpaceEvent;
    previousCount?: number;

    current?: SpaceEvent[];
    currentCount?: number;

    next?: SpaceEvent;
    nextCount?: number;
}