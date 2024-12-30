/**
 * Calculates the number of days between two dates
 * @param fromDate - Start date as string in ISO format or Date object
 * @param toDate - End date as string in ISO format or Date object
 * @returns Object containing days (number) and the exact difference in days (number)
 * @throws Error if invalid dates are provided
 */
function getDaysBetweenDates(
  fromDate: string | Date,
  toDate: string | Date
): {
  days: number;
  exactDays: number;
} {
  if (!fromDate)
    return {
      days: 0,
      exactDays: 0,
    };

  if (!toDate)
    return {
      days: 0,
      exactDays: 0,
    };
  try {
    // Convert input dates to Date objects
    const startDate = fromDate instanceof Date ? fromDate : new Date(fromDate);
    const endDate = toDate instanceof Date ? toDate : new Date(toDate);

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date format provided");
    }

    // Calculate the time difference in milliseconds
    const timeDifference = endDate.getTime() - startDate.getTime();

    // Convert to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const exactDays = timeDifference / millisecondsPerDay;

    // Get whole number of days
    const days = Math.floor(exactDays);

    return {
      days,
      exactDays,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to calculate days between dates: ${error.message}`
      );
    }
    throw error;
  }
}

export default getDaysBetweenDates;
