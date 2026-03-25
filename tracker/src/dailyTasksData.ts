export interface DailyTask {
  id: string;
  day: number;
  text: string;
  completed: boolean;
  column: 'morning' | 'work' | 'evening' | 'bed';
}

/**
 * Generates generic placeholder tasks for any number of days.
 */
export const getPlaceholderTasks = (totalDays: number): DailyTask[] => {
    const tasks: DailyTask[] = [];
    for (let day = 1; day <= totalDays; day++) {
        tasks.push({ id: `d${day}m1`, day, text: 'Morning habit / Exercise', completed: false, column: 'morning' });
        tasks.push({ id: `d${day}w1`, day, text: 'Focus work session 1', completed: false, column: 'work' });
        tasks.push({ id: `d${day}w2`, day, text: 'Focus work session 2', completed: false, column: 'work' });
        tasks.push({ id: `d${day}e1`, day, text: 'Review today / Plan tomorrow', completed: false, column: 'evening' });
        tasks.push({ id: `d${day}b1`, day, text: 'Reading / Wind down', completed: false, column: 'bed' });
    }
    return tasks;
};

// Legacy support or sample data
export const ALL_DAILY_TASKS: DailyTask[] = getPlaceholderTasks(38);
