import { Dragon9TimeState } from '../types';

/**
 * Dragon 9 Temporal Framework Math:
 * - Earth Solar Cycle: 1,440 minutes = 86,400 seconds
 * - Dragon 9 Hour: 54 Standard Minutes (3,240 SI seconds)
 * - Dragon 9 Daily Cycle: 1,440 / 54 = 26.6666... D9 hours (80/3 hours)
 *   -> Exactly 26 Full Hours + 36 minutes (2/3 of an hour)
 * - Dragon 9 Minute: 54 Temporal Seconds
 */
export function calculateDragon9Time(date: Date = new Date()): Dragon9TimeState {
  // Midnight UTC of current date
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const elapsedMs = date.getTime() - startOfDay.getTime();
  const elapsedSeconds = elapsedMs / 1000;
  const elapsedMinutes = elapsedSeconds / 60;

  // Total day progress [0, 1)
  const totalDayProgress = Math.min(Math.max(elapsedMinutes / 1440, 0), 0.999999);

  // Exact D9 decimal hours
  const totalD9Hours = elapsedMinutes / 54;
  const d9Hours = Math.floor(totalD9Hours);
  const remainderMinutes = (totalD9Hours - d9Hours) * 54;
  const d9Minutes = Math.floor(remainderMinutes);
  const remainderSeconds = (remainderMinutes - d9Minutes) * 54;
  const d9Seconds = Math.floor(remainderSeconds);

  // Progress within the current 54-minute block [0, 1)
  const currentHourProgress = remainderMinutes / 54;

  // Epoch cycle counter (days since Dragon 9 Genesis: 2024-09-09)
  const genesis = new Date('2024-09-09T00:00:00Z').getTime();
  const epochCycle = Math.max(1, Math.floor((date.getTime() - genesis) / (1440 * 60 * 1000)));

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formattedD9 = `D9·${pad(d9Hours)}:${pad(d9Minutes)}:${pad(d9Seconds)} (54m/h)`;

  return {
    currentGregorian: date,
    d9Hours,
    d9Minutes,
    d9Seconds,
    totalDayProgress,
    currentHourProgress,
    epochCycle,
    formattedD9,
  };
}

export function formatGregorianTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
