export const formatMillisecondsToMMSS = (milliseconds: number): string => {
  // Calculate total seconds
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the output as "M:SS"
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
