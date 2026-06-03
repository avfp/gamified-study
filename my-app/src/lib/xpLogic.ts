// XP is calculated by number of minutes studied * the difficulty of the work
// Bonus XP comes from Streak (consecutive days studied)

export const calculate XP = (
    minutes: number,
    difficultyMultiplier: number,
    streak: number
) : number => {
    const baseXP = minutes * difficultyMultiplier;
    const streakBonus = Math.min(streak, 10)*0.1;

    return Math.round(baseXP* (1+streakBonus));
}