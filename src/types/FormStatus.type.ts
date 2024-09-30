
export type StatusTypeVariants = 'hidden' | 'warning' | 'error' | 'success';

export type StatusType = {
    readonly label: string;
    readonly variant: StatusTypeVariants;
};

