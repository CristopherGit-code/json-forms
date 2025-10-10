export default interface TodoRegistry {
    name: string;
    last_name?: string;
    description?: string;
    done?: boolean;
    due_date: string;
    rating?:number;
    recurrence?: 'Never' | 'Daily' | 'Weekly' | 'Monthly';
    recurrence_interval?:number;
}