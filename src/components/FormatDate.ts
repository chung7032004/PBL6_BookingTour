/**
"Thứ Ba, 21 thg 10, 2025"
 */
export const formatVNDate = (isoStr?: string): string => {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  const weekday = d.toLocaleDateString('vi-VN', { weekday: 'long' });
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${weekday}, ${day} thg ${month}, ${year}`;
};

/**
"17:00"
 */
export const formatVNTime = (isoStr?: string): string => {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
};

/**
"17:00 – 21:00"
 * Có thể truyền thời gian kết thúc nếu có
 */
export const formatVNTimeRange = (
  startIso?: string,
  endIso?: string,
): string => {
  const start = formatVNTime(startIso);
  const end = endIso ? formatVNTime(endIso) : '';
  return end ? `${start} – ${end}` : start;
};
