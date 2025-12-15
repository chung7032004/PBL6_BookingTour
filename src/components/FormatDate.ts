/**
 * "Tuesday, October 21, 2025"
 */
export const formatENDate = (isoStr?: string): string => {
  if (!isoStr) return '';

  const date = new Date(isoStr);

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  // Output: "Tuesday, October 21, 2025"
};

/**
 * "5:00 PM" or "17:00" depending on preference
 * Using 12-hour format with AM/PM (common in travel apps for English users)
 */
export const formatENTime = (isoStr?: string): string => {
  if (!isoStr) return '';

  const date = new Date(isoStr);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  // Output: "5:00 PM"
};

/**
 * "5:00 PM – 9:00 PM"
 */
export const formatENTimeRange = (
  startIso?: string,
  endIso?: string,
): string => {
  const start = formatENTime(startIso);
  const end = endIso ? formatENTime(endIso) : '';
  return end ? `${start} – ${end}` : start;
};

export const formatTimeWithoutSeconds = (timeString: string) => {
  if (!timeString || timeString.length < 5) {
    return timeString;
  }
  return timeString.trim().slice(0, 5); // Cắt 5 ký tự đầu tiên
};
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};
