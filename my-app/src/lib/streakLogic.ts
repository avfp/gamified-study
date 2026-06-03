export const calculateNewStreak = (currentStreak: number, lastActivityDate: Date | null, currentDate: Date): number => {
    // Calculate the difference in days between the last activity and current date
    const timeDifference = currentDate.getTime() - (lastActivityDate ? lastActivityDate.getTime() : new Date(0).getTime());
    const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (dayDifference === 1) {
        // If the user was active yesterday, increment the streak
        return currentStreak + 1;
    } else if (dayDifference > 1) {
        // If the user missed a day, reset the streak
        return 0;
    } else {
        // If the user is active today or has been active multiple times today, keep the streak unchanged
        return currentStreak;
    }
};